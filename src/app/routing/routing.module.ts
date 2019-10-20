import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { ServerErrorComponent } from '../error-pages/server-error/server-error.component';

const routes: Routes = [  
  { path: 'home', component: HomeComponent},
  { path: 'owner', loadChildren: "./../owner/owner.module#OwnerModule" },
  { path: 'product', loadChildren: "./../product/product.module#ProductModule" },
  { path: 'order', loadChildren: "./../order/order.module#OrderModule" },
  { path: 'ingredient', loadChildren: './../ingredient/ingredient.module#IngredientModule' },
  { path: 'payment', loadChildren: "./../payment/payment.module#PaymentModule" },
  { path: 'client', loadChildren: "./../client/client.module#ClientModule"},
  { path: '404', component: NotFoundComponent}, 
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingModule { }
