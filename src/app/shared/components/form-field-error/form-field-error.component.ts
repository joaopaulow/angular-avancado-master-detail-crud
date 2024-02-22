import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() {}

  ngOnInit(){
  }

  public get errorMessage(): string | null {
    if(this.mustShowErrorMessage())
      return this.getErrorMessage();
    else
      return null;
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null{
    if(this.formControl.errors['required'])
      return "Dado obrigatório";

    else if(this.formControl.errors['email'])
      return "E-mail inválido";

    else if(this.formControl.errors['minlength']){
      const requiredLenght = this.formControl.errors['minlength'].requiredLenght;
      return `Deve ter no mínimo ${requiredLenght} caracteres`;
    }

    else if(this.formControl.errors['maxlength']){
      const requiredLenght = this.formControl.errors['maxlength'].requiredLenght;
      return `Deve ter no máximo ${requiredLenght} caracteres`;
    }

    else
      return "teste";
  }

}
