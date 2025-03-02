import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateOrganizationDocumentDto } from './dto/create-school-document.dto';
import {
  RemoveOrganizationDocumentDto,
  UpdateOrganizationDocumentDto,
} from './dto/update-school-document.dto';
import { UploadOrganizationDocumentDto } from './dto/upload-school-document.dto';
import { DownloadOrganizationDocumentDto } from './dto/download-school-document.dto';
import {
  DOC_TYPE,
  SchoolDocumentEntity,
} from './entities/school-document.entity';
import { validate } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { SCHOOL_DOCUMENT_ID_PREFIX } from '../../config/config';
import * as AWS from 'aws-sdk';
import { classToPlain } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { addQueryFilterToSqlQuery } from '../../src/core/helpers/sqlHelper/sqlHelper';
import { customHttpError } from '../../src/core/custom-error/error-service';
import {
  DATA_VALIDATION_ERROR,
  ORG_DOC_NOT_FOUND,
  INVALID_FILE_TYPE,
  PARTNER_NOT_FOUND,
  PARTNER_PERMISSIONS_AGREEMENT_DATA_UPDATE_ERROR,
  FAILED_TO_SEND_EMAIL_NOTIFICATION,
  ORG_DOC_CREATE_FAILED,
  ORG_AUTH_REP_NOT_FOUND,
  ORG_NOT_FOUND,
} from '../../src/core/custom-error/error-constant';
import {
  ORG_DOC_CREATE_ERROR,
  ORG_DOC_NOT_FOUND_ERROR,
  FILE_TYPE_VALIDATION_ERROR,
  PARTNER_PERMISSIONS_AGREEMENT_DATA_UPDATE_FAILED,
  EMAIL_NOTIFICATION_ERROR,
} from './error.name';

import { SendEmailNotification } from '../../src/client/notification/dto/send-email-notification.dto';
import { NotificationService } from '../../src/client/notification/notification.service';
import { CustomHttpService } from '../../src/core/custom-http-service/custom-http-service.service';
import { SCHOOL_NOT_FOUND_ERROR } from '../../src/school/error.name';
import { CommonService } from '../../src/common/common.service';
import { SchoolService } from '../../src/school/school.service';
import { SchoolUserService } from '../../src/school-user/school-user.service';
const fs = require('fs');

@Injectable()
export class OrganizationDocumentService {
  private partner_service_url: string;
  constructor(
    @InjectRepository(SchoolDocumentEntity)
    private readonly school_document_repository: Repository<SchoolDocumentEntity>,
    private readonly config: ConfigService,
    private readonly notification_service: NotificationService,

    private readonly school_user_service: SchoolUserService,

    private readonly school_service: SchoolService,
    private readonly common_service: CommonService,
    private readonly http_service: CustomHttpService,
  ) {
    if (
      this.config.get(`AWS_ORG_DOCS_ACCESS_KEY`) &&
      this.config.get(`AWS_ORG_DOCS_SECRET_ACCESS_KEY`)
    ) {
      const aws_credentials: {
        accessKeyId: string;
        secretAccessKey: string;
        sessionToken?: string;
      } = {
        accessKeyId: this.config.get(`AWS_ORG_DOCS_ACCESS_KEY`),
        secretAccessKey: this.config.get(`AWS_ORG_DOCS_SECRET_ACCESS_KEY`),
      };
      if (!!this.config.get(`AWS_ORG_DOCS_SESSION_TOKEN`)) {
        aws_credentials['sessionToken'] = this.config.get(
          `AWS_ORG_DOCS_SESSION_TOKEN`,
        );
      }
      AWS.config.credentials = new AWS.Credentials(aws_credentials);
    }

    this.org_docs_bucket_name = this.config.get(`ORG_DOCS_BUCKET_NAME`);
    this.default_msa_doc_path = this.config.get(`DEFAULT_MSA_DOC_PATH`);
    this.default_msa_bucket_name = this.config.get(`DEFAULT_MSA_BUCKET_NAME`);

    // AWS.config.accessKeyId = this.config.get(`AWS_ORG_DOCS_ACCESS_KEY`);
    // AWS.config.secretAccessKey = this.config.get(
    //   `AWS_ORG_DOCS_SECRET_ACCESS_KEY`
    // );
    AWS.config.region = this.config.get(`AWS_ORG_DOCS_REGION`);
    this.s3_client = new AWS.S3({ signatureVersion: 'v4' });
    this.partner_service_url = this.config.get('PARTNER_SERVICE_URL');
  }

  private s3_client: AWS.S3;
  private org_docs_bucket_name: string;
  private default_msa_doc_path: string;
  private default_msa_bucket_name: string;

  private valid_file_types = [
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/json',
    'text/csv',
    'text/xml',
    'application/vnd.ms-excel',
    'text/rtf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/zip',
  ];

  async create(
    school_id: string,
    create_organization_document_dto: CreateOrganizationDocumentDto,
  ) {
    const {
      file_name,
      file_type,
      descriptor,
      metadata,
      is_signature_required,
      is_signed,
      signed_at,
      doc_type,
      download_url,
      is_file_prefix_required,
    } = create_organization_document_dto;
    const file_type_lowercase = file_type.toLowerCase();
    if (!this.valid_file_types.includes(file_type_lowercase)) {
      throw customHttpError(
        INVALID_FILE_TYPE,
        FILE_TYPE_VALIDATION_ERROR,
        `File type ${file_type} is not supported `,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      let { to_be_notified_user_list } = create_organization_document_dto;
      let { is_email_notification_required, sub_folder_path: path } =
        create_organization_document_dto;
      // create new organizationDocument
      let new_organization_document = new SchoolDocumentEntity();
      const uuid = uuidv4().replace(/-/g, '');
      new_organization_document.school_document_id = `${SCHOOL_DOCUMENT_ID_PREFIX}${uuid}`;
      new_organization_document.school_id = school_id;
      new_organization_document.file_name = file_name;
      new_organization_document.file_type = file_type;
      new_organization_document.descriptor = descriptor;
      new_organization_document.is_signature_required = is_signature_required;
      new_organization_document.is_signed = is_signed;
      new_organization_document.signed_at = signed_at;
      new_organization_document.doc_type = doc_type;
      new_organization_document.download_url = download_url;

      if (doc_type === 'agreement') {
        const org = await this.school_service.findOne(school_id);

        if (!org) {
          throw customHttpError(
            ORG_NOT_FOUND,
            SCHOOL_NOT_FOUND_ERROR,
            `Organization with id [${school_id}] not found`,
            HttpStatus.NOT_FOUND,
          );
        }

        new_organization_document.metadata = {
          has_partner_signed: true,
          has_merchant_signed: true,
        };
      } else {
        new_organization_document.metadata = metadata;
      }

      let sub_folder_path;
      if (!!path && path.length > 0) {
        path = path.charAt(path.length - 1) !== '/' ? `${path}/` : path;
        sub_folder_path = path.charAt(0) !== '/' ? `/${path}` : path;
      }

      let new_filename = `${school_id}${sub_folder_path || '_'}${file_name}`;
      if (is_file_prefix_required) {
        const file_prefix = uuid.substring(0, 8);
        new_filename = `${school_id}${sub_folder_path}${file_prefix}-${file_name}`;
      }
      new_organization_document.document_path = new_filename;

      new_organization_document.upload_url = await this.fetchS3UploadPath({
        file_name: new_filename,
        file_type,
      });

      const errors = await validate(new_organization_document);
      if (errors.length > 0) {
        throw customHttpError(
          DATA_VALIDATION_ERROR,
          ORG_DOC_CREATE_ERROR,
          `Input data validation failed`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        await this.school_document_repository.save(new_organization_document);

        if (is_email_notification_required) {
          try {
            to_be_notified_user_list.map(async (user_id) => {
              const user = await this.school_user_service.findOne(user_id);

              await this.sendDocumentEmail(user, file_name);
            });
          } catch (error) {}
        }
        return new_organization_document;
      }
    } catch (e) {
      throw customHttpError(
        ORG_DOC_CREATE_FAILED,
        ORG_DOC_CREATE_ERROR,
        `Failed to generate upload URL`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendDocumentEmail(user: any, file_name: string) {
    const sign_contract_url = new URL(this.config.get('SIGN_CONTRACT_URL'));

    let custom_param: Object = {
      link: sign_contract_url,
      email: user?.email_id,
      name: user?.first_name,
      file_name: file_name,
    };

    const email_notification = {
      template_name: this.config.get('SIGN_CONTRACT_EMAIL_TEMPLATE'),
      sender_address: this.config.get('SIGN_CONTRACT_EMAIL_SENDER_ADDRESS'),
      to_address: user?.email_id,
      subject: `Please eSign: ${file_name} ${this.config.get(
        'SIGN_CONTRACT_EMAIL_SUBJECT',
      )}`,
      custom_param,
    };

    const send_email_notification = new SendEmailNotification(
      email_notification,
    );
    await this.notification_service.sendEmail(send_email_notification);
  }

  async sendMpaSignedEmail(
    correlation_id: string,
    email_id: string,
    org_name: string,
  ) {
    const custom_param = {
      email: email_id,
      client_name: org_name,
      link: 'https://partner.finmo.net/preview/dashboards/organization',
    };
    const send_email_notification = new SendEmailNotification({
      sender_address: this.config.get('SIGN_MPA_EMAIL_SENDER_ADDRESS'),
      to_address: email_id,
      subject: `Merchant Partner Agreement - Signed`,
      template_name: this.config.get('SIGN_MPA_EMAIL_TEMPLATE'),
      custom_param,
    });
    await this.notification_service.sendEmail(send_email_notification);
  }

  async findAll(school_id: string, query: any) {
    const limit = +query.limit || 10;
    const page = +query.page || 1;
    const offset = (page - 1) * limit;

    let sql_query = await this.school_document_repository
      .createQueryBuilder('organization_document')
      .where('is_deleted=:is_deleted', {
        is_deleted: 0, // false
      })
      .andWhere(`org_id = :org_id`, { school_id });

    // todo: use http_encode / http_decode
    const res = await addQueryFilterToSqlQuery(
      'organization_document',
      query,
      sql_query,
    );

    const additional_filter = res.additional_filter;
    sql_query = res.sql_query;

    // execute the query to get result count
    const total = await sql_query.getCount();

    // append `offset` and `limit` filters to the query
    sql_query.orderBy('created_at', 'DESC').offset(offset).limit(limit);

    // execute the query to get result
    const result = await sql_query.getMany();

    const last = Math.ceil(total / limit);
    const next = page + 1 > last ? null : page + 1;
    const previous = page - 1 < 1 ? null : page - 1;

    return {
      data: classToPlain(result),
      _metadata: {
        page,
        page_count: last,
        total_count: total,
        current_page_count: result.length,
        max_per_page: limit,
        links: {
          self: `/organization-document?page=${page}&limit=${limit}${additional_filter}`,
          next: next
            ? `/organization-document?page=${next}&limit=${limit}${additional_filter}`
            : null,
          previous: previous
            ? `/organization-document?page=${previous}&limit=${limit}${additional_filter}`
            : null,
          first: `/organization-document?page=1&limit=${limit}${additional_filter}`,
          last: last
            ? `/organization-document?page=${last}&limit=${limit}${additional_filter}`
            : null,
        },
      },
    };
  }

  async findOne(
    school_id: string,
    school_document_id: string,
    expire_in: number,
  ) {
    const organizationDocument = await this.school_document_repository.findOne({
      where: {
        school_id,
        school_document_id,
        is_deleted: false,
      },
    });

    if (!organizationDocument) {
      throw customHttpError(
        ORG_DOC_NOT_FOUND,
        ORG_DOC_NOT_FOUND_ERROR,
        `School Document with ID[${school_document_id}] not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!organizationDocument.download_url) {
      organizationDocument.download_url = await this.fetchS3DownloadPath({
        document_path: organizationDocument.document_path,
        expire_in: expire_in || 10, // 10 seconds
      });
    }

    return organizationDocument;
  }

  async findOneById(school_document_id: string, expire_in: number) {
    const organizationDocument = await this.school_document_repository.findOne({
      where: {
        school_document_id,
        is_deleted: false,
      },
    });

    if (!organizationDocument) {
      throw customHttpError(
        ORG_DOC_NOT_FOUND,
        ORG_DOC_NOT_FOUND_ERROR,
        `Organization Document with ID[${school_document_id}] not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!organizationDocument.download_url) {
      organizationDocument.download_url = await this.fetchS3DownloadPath({
        document_path: organizationDocument.document_path,
        expire_in: expire_in || 10, // 10 seconds
      });
    }

    return organizationDocument;
  }

  async update(
    school_id: string,
    school_document_id: string,
    update_organization_document_dto: UpdateOrganizationDocumentDto,
  ) {
    const existing_organization_document =
      await this.school_document_repository.findOne({
        where: {
          school_id,
          school_document_id,
          is_deleted: false,
        },
      });
    if (!existing_organization_document) {
      throw customHttpError(
        ORG_DOC_NOT_FOUND,
        ORG_DOC_NOT_FOUND_ERROR,
        `Organization Document with Id[${school_document_id}] doesn't exist.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.school_document_repository.update(
      school_document_id,
      update_organization_document_dto,
    );
    const result = await this.school_document_repository.findOne({
      where: {
        school_id,
        school_document_id,
        is_deleted: false,
      },
    });

    return result;
  }

  async findAllByQuery(query: any) {
    const org_document = await this.school_document_repository.find(query);
    return org_document;
  }

  async delete(
    school_id: string,
    school_document_id: string,
    deleteDocumentFlag = false,
  ) {
    if (deleteDocumentFlag) {
      const document = await this.school_document_repository.findOne({
        where: {
          school_id: school_id,
          school_document_id,
          is_deleted: false,
        },
      });
      if (!document) {
        throw customHttpError(
          ORG_DOC_NOT_FOUND,
          ORG_DOC_NOT_FOUND_ERROR,
          `Organization Document with ID[${school_document_id}] not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.s3_client.deleteObjects(
        {
          Bucket: this.org_docs_bucket_name,
          Delete: { Objects: [{ Key: document.document_path }] },
        },
        (err, data) => {
          if (err) {
          } else {
          }
        },
      );
    }

    const existing_organization_document =
      await this.school_document_repository.findOne({
        where: {
          school_id,
          school_document_id,
          is_deleted: false,
        },
      });
    if (!existing_organization_document) {
      throw customHttpError(
        ORG_DOC_NOT_FOUND,
        ORG_DOC_NOT_FOUND_ERROR,
        `Organization Document with Id[${school_document_id}] doesn't exist.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const to_update = {
      is_deleted: true,
      deleted_at: new Date(new Date().toUTCString()),
    };

    await this.school_document_repository.update(school_document_id, to_update);
    const result = await this.school_document_repository.findOne({
      where: {
        school_document_id,
        is_deleted: false,
      },
    });

    return result;
  }

  async fetchS3UploadPath(
    uploadOrganizationDocumentDto: UploadOrganizationDocumentDto,
  ) {
    const { file_name, file_type } = uploadOrganizationDocumentDto;

    const url = await this.s3_client.getSignedUrlPromise('putObject', {
      Bucket: this.org_docs_bucket_name,
      ContentType: file_type,
      Key: file_name,
      Expires: 600, //time to expire in seconds
    });

    return url;
  }

  async fetchS3DownloadPath(
    downloadOrganizationDocumentDto: DownloadOrganizationDocumentDto,
  ) {
    const { document_path, expire_in } = downloadOrganizationDocumentDto;
    let url;

    try {
      url = await this.s3_client.getSignedUrlPromise('getObject', {
        Bucket: this.org_docs_bucket_name,
        Key: document_path,
        Expires: expire_in, //time to expire in seconds
      });
    } catch (error) {
      throw customHttpError(
        { code: '124050', description: 'Failed to generate download URL' },
        'Failed to generate download URL',
        `Failed to generate download URL`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return url;
  }

  async getReuploadUrl(
    school_document_id: string,
    school_id: string,
    body: CreateOrganizationDocumentDto,
  ) {
    const org_document = await this.school_document_repository.findOne({
      where: {
        school_id,
        school_document_id,
        is_deleted: false,
      },
    });

    let { sub_folder_path: path } = body;

    let sub_folder_path;
    if (!!path && path.length > 0) {
      path = path.charAt(path.length - 1) !== '/' ? `${path}/` : path;
      sub_folder_path = path.charAt(0) !== '/' ? `/${path}` : path;
    }

    let new_filename = `${school_id}${sub_folder_path}${body.file_name}`;
    if (body.is_file_prefix_required) {
      const uuid = uuidv4().replace(/-/g, '');
      const file_prefix = uuid.substring(0, 8);
      new_filename = `${school_id}${sub_folder_path}${file_prefix}-${body.file_name}`;
    }

    const upload_url = await this.fetchS3UploadPath({
      file_name: new_filename,
      file_type: org_document.file_type,
    });

    const updated_organization_document =
      await this.school_document_repository.update(school_document_id, {
        upload_url: upload_url,
        file_name: `${body.file_name}`,
        document_path: `${new_filename}`,
      });

    return { upload_url: upload_url };
  }
}
