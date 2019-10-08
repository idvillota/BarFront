import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';

import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Product } from 'src/app/_interface/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  public productForm: FormGroup;
  private dialogConfig;
  private product: Product

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {

    this.productForm = new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      costPrice: new FormControl('', [Validators.required]),
      salePrice: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])
    });
    this.getProduct();
  }

  private getProduct = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/product/${id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.product = res as Product;

        this.productForm.patchValue(this.product);
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

  public updateProduct = (productFormValue) => {
    if (this.productForm.valid)
      this.executeProductUpdate(productFormValue);
  }

  private executeProductUpdate = (productFormValue) => {

    this.product.id = productFormValue.id,
      this.product.name = productFormValue.name,
      this.product.description = productFormValue.description,
      this.product.costPrice = productFormValue.costPrice,
      this.product.salePrice = productFormValue.salePrice,
      this.product.quantity = productFormValue.quantity

    let apiUrl = `api/product/${this.product.id}`;
    this.repository.update(apiUrl, this.product)
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
