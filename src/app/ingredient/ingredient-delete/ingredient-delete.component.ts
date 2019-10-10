import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/_interface/ingredient.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingredient-delete',
  templateUrl: './ingredient-delete.component.html',
  styleUrls: ['./ingredient-delete.component.css']
})
export class IngredientDeleteComponent implements OnInit {

  public errorMessage: string = '';
  public ingredient: Ingredient;

  constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute){                
               }

  ngOnInit() {
    this.getIngredient();
  }

  private getIngredient(){
    let ingredientId: string = this.activeRoute.snapshot.params['id'];
    let ingredientByIdUrl: string = `api/ingredient/${ingredientId}`;

    this.repository.getData(ingredientByIdUrl)
      .subscribe(res => {
        this.ingredient = res as Ingredient;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public redirectToIngredientList(){
    this.router.navigate(['/ingredient/ingredients']);
  }

  public deleteIngredient(){
    let deleteUrl: string = `api/ingredient/${this.ingredient.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        alert("Deleted ingredient");
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
}
