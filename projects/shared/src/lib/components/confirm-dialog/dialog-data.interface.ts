export interface DialogData {
  title: string;
  text: string;
  hasActions: boolean;
  mode: 'delete' | 'create' | 'update' | 'confirmAction' | 'activate';
  itemIdentifier?: string;
  question?: string;
  questionActions?: Array<{ answer: string; action: string }>;
}
