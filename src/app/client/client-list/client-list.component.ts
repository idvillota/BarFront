import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/_interface/client.module';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  public displayedColumns = ['firstName', 'lastName', 'documentNumber', 'update','delete']
  public dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  constructor(private repoService: RepositoryService,
              private errorService: ErrorHandlerService,
              private router: Router) { }

  ngOnInit() {
    this.getAllClients();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

public getAllClients = () => {
  this.repoService.getData('api/client')
    .subscribe(res => {
      this.dataSource.data = res as Client[];
    }, error => {
      this.errorService.handleError(error);
    });
}

public redirectToUpdate = (id: string) => {
  let url: string = `/client/update/${id}`;
  this.router.navigate([url]);
}

public redirectToDelete = (id: string) => {
  let deleteUrl: string = `/client/delete/${id}`;
  this.router.navigate([deleteUrl]);
}

}
