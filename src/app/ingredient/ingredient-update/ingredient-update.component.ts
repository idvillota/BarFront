import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/_interface/ingredient.model';
import { Location } from '@angular/common';
import { RepositoryService } from 'src/app/shared/repository.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingredient-update',
  templateUrl: './ingredient-update.component.html',
  styleUrls: ['./ingredient-update.component.css']
})
export class IngredientUpdateComponent implements OnInit {

  public ingredientForm: FormGroup;
  private dialogConfig;
  private ingredient: Ingredient;

  constructor(private location: Location,
              private repository: RepositoryService,
              private dialog: MatDialog,
              private errorService: ErrorHandlerService,
              private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService){    
   }

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      value: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])
    });
    this.getIngredient();
  }

  private getIngredient = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/ingredient/${id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.ingredient = res as Ingredient;

        this.ingredientForm.patchValue(this.ingredient);
        this.dialogConfig = {
          height: '200px',
          width: '400px',
          disableClose: true,
          data: {}
        }
      },
      (error => {
        this.errorHandler.handleError(error);
      })
    );
  }

  public onCancel = () => {
    this.location.back();
  }

  public updateIngredient = (ingredientFormValue) => {
    if(this.ingredientForm.valid)
      this.executeIngredientUpdate(ingredientFormValue);
  }

  private executeIngredientUpdate = (ingredientFormValue) => {
    
    this.ingredient.id = ingredientFormValue.id,
    this.ingredient.name = ingredientFormValue.name,
    this.ingredient.quantity = ingredientFormValue.quantity,
    this.ingredient.value = ingredientFormValue.value

    let apiUrl = `api/ingredient/${this.ingredient.id}`;
    this.repository.update(apiUrl, this.ingredient)
      .subscribe(res => {
      this.location.back();
    }, (
      error => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
      })
    )
  }

}
