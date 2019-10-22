import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing/product-routing.module';
import { MaterialModule } from './../material/material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent, ProductUpdateComponent, ProductDeleteComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ProductModule { }
