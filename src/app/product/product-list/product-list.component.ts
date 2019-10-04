import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Product } from '../../_interface/product.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // public displayedColumns = ['name', 'description', 'salePrice', 'costPrice', 'quantity'];
  public displayedColumns = ['name', 'description', 'costPrice', 'salePrice',  'quantity'];
  public dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false })paginator: MatPaginator;

  constructor(private repoService: RepositoryService,
              private errorService: ErrorHandlerService,
              private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllProducts = () => {
    this.repoService.getData('api/product')
      .subscribe(res => {
        this.dataSource.data = res as Product[];
      },
      (error) => {
        this.errorService.handleError(error);
      })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
