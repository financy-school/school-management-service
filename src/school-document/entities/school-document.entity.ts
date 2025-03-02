import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum DOC_TYPE {
  'contract' = 'contract',
  'base contract' = 'base contract',
  'base contract without pricing' = 'base contract without pricing',
  'merged contract' = 'merged contract',
  'agreement' = 'agreement',
  'base agreement' = 'base agreement',
  'reliance_agreement' = 'reliance_agreement',
  'referral_agreement' = 'referral_agreement',
  'additional_document' = 'additional_document',
}

@Entity('school_document')
export class SchoolDocumentEntity {
  @PrimaryColumn({ type: 'varchar', length: 80 })
  school_document_id: string;

  @Index('org_id_idx')
  @Column({ type: 'varchar', length: 80 })
  school_id: string;

  @Column({ type: 'varchar', length: 100 })
  file_name: string;

  @Column({ type: 'varchar', length: 100 })
  file_type: string;

  @Column({ type: 'boolean', default: false })
  is_signature_required: boolean;

  @Column({ type: 'boolean', default: false })
  is_signed: boolean;

  @Column({ type: 'varchar', default: null, length: 80, nullable: true })
  signatory_org_user_id: string;

  @Column({ type: 'enum', enum: DOC_TYPE, default: null, nullable: true })
  doc_type: string;

  @Column({
    type: 'timestamp',
    precision: 6,
    default: null,
    nullable: true,
  })
  signed_at: Date;

  @Column({ type: 'varchar', length: 100, default: null, nullable: true })
  descriptor: string;

  @Column({ type: 'json', default: null, nullable: true })
  metadata: Object;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 80, default: null, nullable: true })
  stored_at_location: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', length: 200, default: null, nullable: true })
  document_path: string;

  @Column({ type: 'varchar', length: 3000 })
  upload_url: string;

  @Column({ type: 'varchar', length: 500, default: null, nullable: true })
  download_url: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'json', default: null, nullable: true })
  raw_data: Object;

  @Column({ type: 'boolean', default: 0 })
  is_deleted: boolean;

  @Column({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @Column({ type: 'varchar', length: 200, default: null, nullable: true })
  last_modified_by_org_user_id: string;

  @Column({ type: 'timestamp', precision: 6, default: null, nullable: true })
  deleted_at: Date;
}
