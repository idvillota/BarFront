import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/_interface/client.module';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {
  
  public errorMessage: string = '';
  public client: Client;

  constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute){                
               }

  ngOnInit() {
    this.getClient();
  }

  private getClient(){
    let clientId: string = this.activeRoute.snapshot.params['id'];
    let clientByIdUrl: string = `api/client/${clientId}`;

    this.repository.getData(clientByIdUrl)
      .subscribe(res => {
        this.client = res as Client;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public redirectToClientList(){
    this.router.navigate(['/client/clients']);
  }

  public deleteClient(){
    let deleteUrl: string = `api/client/${this.client.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        alert("Deleted client");
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
  
}
