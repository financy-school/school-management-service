import { IsNotEmpty, IsString } from "class-validator";

export class UploadOrganizationDocumentDto {
  @IsNotEmpty()
  @IsString()
  readonly file_name: string;

  @IsNotEmpty()
  @IsString()
  readonly file_type: string;
}
