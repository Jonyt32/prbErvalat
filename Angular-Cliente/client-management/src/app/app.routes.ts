import { Routes } from '@angular/router';
import { ClientManagementComponent } from './administrator/clients/client-management/client-management.component';


export const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientManagementComponent },
];