import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { Ingredient } from '../../_interface/ingredient.model';
import { RepositoryService } from './../../shared/repository.service';
import { ErrorHandlerService } from './../../shared/error-handler.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  public displayedColumns = ['name', 'quantity', 'value']
  public dataSource = new MatTableDataSource<Ingredient>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private repoService: RepositoryService,
              private errorService: ErrorHandlerService,
              private router: Router) { }

  ngOnInit() {
    this.getAllIngredients();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllIngredients = () => {
    this.repoService.getData('api/ingredient')
      .subscribe(res => {
        this.dataSource.data = res as Ingredient[];
      },
      (error) => {
        this.errorService.handleError(error);
      })
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `/ingredient/update/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    let deleteUrl: string = `/ingredient/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }

}
