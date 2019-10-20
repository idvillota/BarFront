import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { RepositoryService } from 'src/app/shared/repository.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { IngredientForCreation } from 'src/app/_interface/ingredientForCreation';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})
export class IngredientCreateComponent implements OnInit {

  public ingredientForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location,
              private repository: RepositoryService,
              private dialog: MatDialog,
              private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.ingredientForm= new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      quantity: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ingredientForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () =>{
    this.location.back();
  }

  public createIngredient = (ingredientFormValue) => {
    if(this.ingredientForm.valid)
      this.executeIngredientCreation(ingredientFormValue);
  }

  private executeIngredientCreation = (ingredientFormValue) => {
    let ingredient: IngredientForCreation = {
      name: ingredientFormValue.name,
      quantity: ingredientFormValue.quantity,
      value: ingredientFormValue.value
    }

    let apiUrl = 'api/ingredient';
    this.repository.create(apiUrl, ingredient)
      .subscribe(res => {
          let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig); 
        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error => {
        this.errorService.dialogConfig = {...this.dialogConfig};
        this.errorService.handleError(error);
      }))
  }

}
