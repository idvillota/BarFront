import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IngredientListComponent } from '../ingredient-list/ingredient-list.component';
import { IngredientCreateComponent } from '../ingredient-create/ingredient-create.component';
import { IngredientUpdateComponent } from '../ingredient-update/ingredient-update.component';

const routes: Routes = [
   { path: 'ingredients', component: IngredientListComponent },
   { path: 'create', component: IngredientCreateComponent },
   { path: 'update/:id', component: IngredientUpdateComponent },
  // { path: 'delete/:id', component: IngredientDeleteComponent }
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
export class IngredientRoutingModule { }
