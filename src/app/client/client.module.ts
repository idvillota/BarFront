import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { ClientRoutingModule } from './client-routing/client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientUpdateComponent } from './client-update/client-update.component';
import { ClientDeleteComponent } from './client-delete/client-delete.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClientListComponent, ClientCreateComponent, ClientUpdateComponent, ClientDeleteComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ClientModule { }
