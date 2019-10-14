import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Payment } from 'src/app/_interface/payment.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  public displayedColumns = ['number', 'date', 'total', 'details'];
  public dataSource = new MatTableDataSource<Payment>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private repoService: RepositoryService,
              private errorService: ErrorHandlerService,
              private router: Router) { }

  ngOnInit() {
    this.getAllPayments();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllPayments(){
    this.repoService.getData('api/payment')
      .subscribe(res => {
        this.dataSource.data = res as Payment[];
      },
      error => {
        this.errorService.handleError(error);
      })
  }

  public redirectToDetails = (id: string) => {
    let detailsUrl: string = `/payment/details/${id}`;
    this.router.navigate([detailsUrl]);
  }

}
