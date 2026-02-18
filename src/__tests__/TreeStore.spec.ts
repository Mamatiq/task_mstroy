import { describe, it, expect, beforeEach } from 'vitest';
import { TreeStore } from '../core/TreeStore';
import type { TreeItem } from '../types/tree';

describe('TreeStore', () => {
  const items: TreeItem[] = [
    { id: 1, parent: null, label: 'Айтем 1' },
    { id: '91064cee', parent: 1, label: 'Айтем 2' },
    { id: 3, parent: 1, label: 'Айтем 3' },
    { id: 4, parent: '91064cee', label: 'Айтем 4' },
    { id: 5, parent: '91064cee', label: 'Айтем 5' },
    { id: 6, parent: '91064cee', label: 'Айтем 6' },
    { id: 7, parent: 4, label: 'Айтем 7' },
    { id: 8, parent: 4, label: 'Айтем 8' }
];


  let store: TreeStore;

  beforeEach(() => {
    store = new TreeStore(items);
  });

  it('getAll() должен возвращать все элементы', () => {
    expect(store.getAll()).toEqual(items);
  });

  it('getItem(id) должен возвращать правильный элемент', () => {
    expect(store.getItem(4)).toEqual({ id: 4, parent: 2, label: 'Айтем 4' });
  });

  it('getChildren(id) должен возвращать только прямых потомков', () => {
    const children = store.getChildren(2);
    expect(children.length).toBe(3);
    expect(children.map(i => i.id)).toContain(4);
    expect(children.map(i => i.id)).not.toContain(7);
  });

  it('getAllChildren(id) должен возвращать всех потомков рекурсивно', () => {
    const allChildren = store.getAllChildren(2);
    expect(allChildren.length).toBe(5);
    expect(allChildren.map(i => i.id)).toStrictEqual(expect.arrayContaining([4, 5, 6, 7, 8]));
  });

  it('getAllParents(id) должен возвращать цепочку родителей до корня', () => {
    const parents = store.getAllParents(7);
    expect(parents[0]!.id).toBe(4);
    expect(parents[1]!.id).toBe(2);
    expect(parents[2]!.id).toBe(1);
    expect(parents.length).toBe(3);
  });
});
