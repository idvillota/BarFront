import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { IngredientRoutingModule } from './ingredient-routing/ingredient-routing.module';
import { MaterialModule } from './../material/material.module';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientCreateComponent } from './ingredient-create/ingredient-create.component';
import { IngredientUpdateComponent } from './ingredient-update/ingredient-update.component';

@NgModule({
  declarations: [ IngredientListComponent, IngredientCreateComponent, IngredientUpdateComponent ],
  imports: [
    CommonModule,
    IngredientRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IngredientModule { }
