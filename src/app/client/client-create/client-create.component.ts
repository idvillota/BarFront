import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { RepositoryService } from 'src/app/shared/repository.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { ClientForCreation } from 'src/app/_interface/clientForCreation';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  public clientForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location,
              private repository: RepositoryService,
              private dialog: MatDialog,
              private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.clientForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      documentNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),      
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),      
      birthDate: new FormControl('', [Validators.required]),      
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),      
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clientForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createClient = (clientFormValue) => {
    if(this.clientForm.valid)
      this.executeClientCreation(clientFormValue);
  }

  private executeClientCreation = (clientFormValue) => {
    let client: ClientForCreation ={
      firstName: clientFormValue.firstName,
      lastName: clientFormValue.lastName,
      documentNumber: clientFormValue.documentNumber,
      address: clientFormValue.address,
      birthDate: clientFormValue.birthDate,
      email: clientFormValue.email,
      phoneNumber: clientFormValue.phoneNumber
    };

    let apiUrl = 'api/client';
    this.repository.create(apiUrl, client)
      .subscribe(res => {
        //let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig); 
        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        // dialogRef.afterClosed()
        //   .subscribe(result => {
        //     this.location.back();
        //   });
        this.location.back();
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      )
  }

}
