import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_interface/product.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  public errorMessage: string = '';
  public product: Product;

  constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute){                
               }

  ngOnInit() {
    this.getProduct();
  }

  private getProduct(){
    let productId: string = this.activeRoute.snapshot.params['id'];
    let productByIdUrl: string = `api/product/${productId}`;

    this.repository.getData(productByIdUrl)
      .subscribe(res => {
        this.product = res as Product;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public redirectToProductList(){
    this.router.navigate(['/product/products']);
  }

  public deleteProduct(){
    let deleteUrl: string = `api/product/${this.product.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        alert("Deleted product");
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

}
