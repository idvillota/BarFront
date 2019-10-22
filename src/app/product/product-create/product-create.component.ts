import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';

import { RepositoryService } from 'src/app/shared/repository.service';
import { productForCreation } from 'src/app/_interface/productForCreation';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  public productForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, 
              private repository: RepositoryService, 
              private dialog: MatDialog, 
              private errorService: ErrorHandlerService) {
  }

  ngOnInit(){
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      costPrice: new FormControl('', [Validators.required]),
      salePrice: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { title: 'Create Product', body: 'Product succesfully created!' }
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () =>{
    this.location.back();
  }

  public createProduct = (productFormValue) => {
    if(this.productForm.valid)
      this.executeProductCreation(productFormValue);
  }

  private executeProductCreation = (productFormValue) => {
    let product: productForCreation = {
      name: productFormValue.name,
      description: productFormValue.description,
      costPrice: productFormValue.costPrice,
      salePrice: productFormValue.salePrice,
      quantity: productFormValue.quantity
    }

    let apiUrl = 'api/product';
    this.repository.create(apiUrl, product)
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
      })
      )
  }

}
