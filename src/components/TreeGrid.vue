<template>
  <div class="grid-wrapper">
    <div class="grid-header">
      <span class="status-badge">Режим: просмотр</span>
    </div>

    <ag-grid-vue
      theme="legacy"
      class="ag-theme-alpine custom-grid"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :treeData="true"
      :animateRows="true"
      :getDataPath="getDataPath"
      :autoGroupColumnDef="autoGroupColumnDef"
      :groupDefaultExpanded="-1"
      @grid-ready="onGridReady"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { AgGridVue } from "ag-grid-vue3";
import type {
  ColDef,
  GridReadyEvent,
  GetDataPath,
  ValueGetterParams
} from "ag-grid-community";

import "ag-grid-enterprise";

// Стили
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import type { TreeItem} from "../types/tree";
import { ItemCategory } from "../types/tree"
import { TreeStore } from "../core/TreeStore";

const props = defineProps<{
  initialData: TreeItem[]
}>();

let store: TreeStore;
const rowData = ref<TreeItem[]>([]);

onBeforeMount(() => {
  store = new TreeStore(props.initialData);
  rowData.value = store.getAll();
});

const columnDefs = ref<ColDef[]>([
  {
    headerName: "№ п/п",
    valueGetter: "node.rowIndex + 1",
    width: 100,
    sortable: false,
    suppressHeaderMenuButton: true,
    cellStyle: { color: '#888' }
  },
  {
    headerName: "Наименование",
    field: "label",
    flex: 1,
    minWidth: 200
  }
]);

const autoGroupColumnDef = ref<ColDef>({
  headerName: "Категория",
  minWidth: 280,
  cellRendererParams: {
    suppressCount: true,
  },
  valueGetter: (params: ValueGetterParams) => {
    if (!params.data) return '';
    const children = store.getChildren(params.data.id);
    return children.length > 0 ? ItemCategory.Group : ItemCategory.Element;
  }
});

const getDataPath: GetDataPath = (data: TreeItem) => {
  const parents = store.getAllParents(data.id);
  return [...parents.reverse().map(p => p.label), data.label];
};

const onGridReady = (params: GridReadyEvent) => {
  params.api.sizeColumnsToFit();
};
</script>

<style scoped>
.grid-wrapper {
  height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.grid-header {
  padding: 12px 20px;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.status-badge {
  color: #0ea5e9;
  font-weight: 600;
  font-size: 0.875rem;
}

.custom-grid {
  flex: 1;
}

:deep(.ag-theme-alpine) {
  --ag-header-background-color: #f1f5f9;
  --ag-header-foreground-color: #64748b;
  --ag-header-column-separator-display: block;
  --ag-header-column-separator-color: #e2e8f0;
  --ag-row-hover-color: #f1f5f9;
  --ag-selected-row-background-color: #e0f2fe;
  --ag-font-size: 14px;
  --ag-font-family: 'Inter', sans-serif;
}

:deep(.ag-cell-wrapper.ag-row-group) {
  font-weight: 500;
}
</style>
