export interface BaseEntity {
  id?: string; // optional to allow send an entity without ID in create-mode
  created?: string;
  createdBy?: string;
  updated?: string | null;
  updatedBy?: string | null;
}
