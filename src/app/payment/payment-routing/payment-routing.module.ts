import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentListComponent } from '../payment-list/payment-list.component';
import { PaymentCreateComponent } from '../payment-create/payment-create.component';

const routes: Routes =[
  { path: 'payments', component: PaymentListComponent },
  { path: 'create', component: PaymentCreateComponent }
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
export class PaymentRoutingModule { }
 