import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Client } from 'src/app/_interface/client.module';
import { RepositoryService } from 'src/app/shared/repository.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

  public clientForm: FormGroup;
  private dialogConfig;
  private client: Client;

  constructor(private location: Location,
              private repository: RepositoryService,
              private dialog: MatDialog,
              private errorService: ErrorHandlerService,
              private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
      this.clientForm = new FormGroup({
        id: new FormControl('', Validators.required),
        firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        documentNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),      
        address: new FormControl('', [Validators.required, Validators.maxLength(100)]),      
        birthDate: new FormControl('', [Validators.required]),      
        email: new FormControl('', [Validators.required, Validators.maxLength(50)]),      
        phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10)])
    });

    this.getClient();
  }

  private getClient = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/client/${id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.client = res as Client;

        this.clientForm.patchValue(this.client);
        this.dialogConfig = {
          height: '200px',
          width: '400px',
          disableClose: true,
          data: {}
        }
      },
      error => {
        this.errorHandler.handleError(error);
      });
  }

  public onCancel = () => {
    this.location.back();
  }

  public updateClient = (clientFormValue) => {
    this.client.id = clientFormValue.id;
    this.client.firstName = clientFormValue.firstName;
    this.client.lastName = clientFormValue.lastName;
    this.client.documentNumber = clientFormValue.documentNumber;
    this.client.address = clientFormValue.address;
    this.client.birthDate = clientFormValue.birthDate;
    this.client.email = clientFormValue.email;
    this.client.phoneNumber = clientFormValue.phoneNumber;

    let apiUrl = `api/client/${this.client.id}`;
    this.repository.update(apiUrl, this.client)
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
