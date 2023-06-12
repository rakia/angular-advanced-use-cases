export interface EcsFileToUpload {
  ecsVersion: string;
  ecsVersionId?: string;
  uploadFile?: File;
  uploadFileName?: string;
  isUploadedSuccessfully?: boolean;
}
