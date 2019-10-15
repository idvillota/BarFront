import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../material/material.module';
import { OrderRoutingModule } from './order-routing/order-routing.module';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [OrderCreateComponent, OrderListComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }
