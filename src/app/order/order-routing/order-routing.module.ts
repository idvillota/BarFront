import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderCreateComponent } from '../order-create/order-create.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';

const routes: Routes = [
  { path: 'orders', component: OrderListComponent },
  { path: 'create', component: OrderCreateComponent },
  { path: 'details/:id', component: OrderDetailsComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class OrderRoutingModule { }
