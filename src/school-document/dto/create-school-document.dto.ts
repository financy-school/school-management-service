import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsArray,
  IsEnum,
  IsObject,
} from 'class-validator';
import { DOC_TYPE } from '../entities/school-document.entity';

export enum VERIFICATION_TYPE {
  'AUTH_REP' = 'AUTH_REP',
  'SHAREHOLDER' = 'SHAREHOLDER',
  'DIRECTOR' = 'DIRECTOR',
}

export enum VERIFICATION_DOC_TYPE {
  'DOCUMENT' = 'DOCUMENT',
  'ADDRESS_PROOF' = 'ADDRESS_PROOF',
}

export class CreateOrganizationDocumentDto {
  @IsNotEmpty()
  @IsString()
  readonly file_name: string;

  @IsNotEmpty()
  @IsString()
  readonly file_type: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(VERIFICATION_DOC_TYPE)
  readonly verification_doc_type?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(VERIFICATION_TYPE)
  readonly verification_type?: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  readonly is_signature_required: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  readonly is_signed: boolean;

  @IsNotEmpty()
  @IsEnum(DOC_TYPE)
  @IsString()
  @IsOptional()
  readonly doc_type: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly download_url: string;

  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  readonly signed_at: Date;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly descriptor: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly sub_folder_path?: string = '/';

  @IsNotEmpty()
  @IsOptional()
  readonly metadata: Object;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  readonly is_email_notification_required?: boolean = false;

  @IsOptional()
  @IsArray()
  readonly to_be_notified_user_list?: [] = [];
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  readonly is_file_prefix_required?: boolean = true;
}
