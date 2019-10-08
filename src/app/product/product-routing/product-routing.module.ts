import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from '../product-list/product-list.component';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'create', component: ProductCreateComponent },
  { path: 'update/:id', component: ProductUpdateComponent },
  { path: 'delete/:id', component: ProductDeleteComponent}
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
export class ProductRoutingModule { }
