import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentRoutingModule } from './payment-routing/payment-routing.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentCreateComponent } from './payment-create/payment-create.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [PaymentListComponent, PaymentCreateComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
