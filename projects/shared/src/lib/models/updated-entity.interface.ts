export interface UpdatedEntity<T> {
  entityId: string;
  entityName: string;
  updatedAttributes: T;
}
