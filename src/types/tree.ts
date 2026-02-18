export type Id = string | number;

export interface TreeItem {
  id: Id;
  parent: Id | null;
  label: string;
  [key: string]: string | number | boolean | null | undefined | unknown;
}

export enum ItemCategory {
  Group = 'Группа',
  Element = 'Элемент'
}
