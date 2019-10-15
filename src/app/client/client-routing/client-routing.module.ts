import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from '../client-list/client-list.component';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { ClientUpdateComponent } from '../client-update/client-update.component';
import { ClientDeleteComponent } from '../client-delete/client-delete.component';

const routes: Routes = [
  { path: 'clients', component: ClientListComponent },
  { path: 'create', component: ClientCreateComponent },
  { path: 'update/:id', component: ClientUpdateComponent},
  { path: 'delete/:id', component: ClientDeleteComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientRoutingModule { }
