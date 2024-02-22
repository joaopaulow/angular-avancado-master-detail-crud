import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { CategoryService } from "../shared/category.service";
import { Category } from '../shared/category.model';
import { CategoriesRoutingModule } from '../categories-routing.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  category: Category = new Category();


  constructor(
    protected categoryService: CategoryService,
    protected override injector: Injector,
    protected override toastrService: ToastrService
  ){
    super(injector, new Category(), categoryService, Category.fromJson, toastrService)
  }

  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Nova Categoria";
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource.name || "";
    return "Editando Categoria " + resourceName;
  }

}
