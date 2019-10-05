import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from '../product-list/product-list.component';
import { ProductCreateComponent } from '../product-create/product-create.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'create', component: ProductCreateComponent }
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
