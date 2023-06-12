export interface ActionButton {
  name: ActionType;
  label: string;
  icon: string;
  show?: boolean;
  disabled?: boolean;
  tooltipMessage?: string;
  routerLink?: string;
}

export declare type ActionType =
  | 'edit'
  | 'save'
  | 'delete'
  | 'cancel'
  | 'open'
  | 'clone'
  | 'openMapping'
  | 'addExampleEvent'
  | 'print'
  | 'details'
  | 'copy'
  | 'restore'
  | 'compareReleases';
