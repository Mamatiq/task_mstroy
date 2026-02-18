import { createApp } from 'vue'
import App from './App.vue'

import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([ AllCommunityModule, AllEnterpriseModule ]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const app = createApp(App)
app.mount('#app')
