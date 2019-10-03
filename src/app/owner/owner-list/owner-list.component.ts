import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Owner } from '../../_interface/owner.model';
import { RepositoryService } from './../../shared/repository.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Owner>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private repoService: RepositoryService, 
              private errorService: ErrorHandlerService, 
              private router: Router) { }

  ngOnInit() {
    this.getAllOwners();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllOwners = () =>{
    this.repoService.getData('api/owner')
      .subscribe(res => {
        this.dataSource.data = res as Owner[];
      },
      (error) => {
        this.errorService.handleError(error);
      });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {    
    let url: string = `/owner/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
  }

  public redirectToDelete = (id: string) => {    
  }

}