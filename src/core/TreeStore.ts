import type { TreeItem, Id } from '../types/tree';

export class TreeStore {
  private itemsMap: Map<Id, TreeItem> = new Map();
  private childrenMap: Map<Id | null, TreeItem[]> = new Map();

  constructor(private items: TreeItem[]) {
    this.init();
  }

  private init() {
    for (const item of this.items) {
      this.itemsMap.set(item.id, item);

      const parentId = item.parent;
      if (!this.childrenMap.has(parentId)) {
        this.childrenMap.set(parentId, []);
      }
      this.childrenMap.get(parentId)!.push(item);
    }
  }

  getAll(): TreeItem[] {
    return this.items;
  }

  getItem(id: Id): TreeItem | undefined {
    return this.itemsMap.get(id);
  }

  getChildren(id: Id): TreeItem[] {
    return this.childrenMap.get(id) || [];
  }

  getAllChildren(id: Id): TreeItem[] {
    const result: TreeItem[] = [];
    const stack = [...this.getChildren(id)];

    while (stack.length > 0) {
      const current = stack.pop()!;
      result.push(current);
      const children = this.getChildren(current.id);
      if (children.length > 0) {
        stack.push(...children);
      }
    }
    return result;
  }

  getAllParents(id: Id): TreeItem[] {
    const result: TreeItem[] = [];
    let current = this.getItem(id);

    while (current && current.parent !== null) {
      const parent = this.getItem(current.parent);
      if (parent) {
        result.push(parent);
        current = parent;
      } else {
        break;
      }
    }
    return result;
  }
}
