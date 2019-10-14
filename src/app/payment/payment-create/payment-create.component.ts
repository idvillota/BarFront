import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { RepositoryService } from 'src/app/shared/repository.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { PaymentForCreation } from 'src/app/_interface/paymentForCreation';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {

  public paymentForm: FormGroup
  private dialogConfig;

  constructor(private location: Location,
              private repository: RepositoryService,
              private dialog: MatDialog,
              private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.paymentForm = new FormGroup({
      number: new FormControl('', [Validators.required]),
      total: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.paymentForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () =>{
    this.location.back();
  }

  public createPayment = (paymentFormValue) => {
    if(this.paymentForm.valid)
      this.executePaymentCreation(paymentFormValue);
  }

  private executePaymentCreation = (paymentFormValue) => {
    let payment: PaymentForCreation = {
      number: paymentFormValue.number,
      total: paymentFormValue.total,
      date: paymentFormValue.date
    }

    let apiUrl = 'api/payment';
    this.repository.create(apiUrl, payment)
      .subscribe(res => {
        this.location.back();
      },
      (error => {
        this.errorService.dialogConfig = {...this.dialogConfig};
        this.errorService.handleError(error);
      }))
  
  }
}
