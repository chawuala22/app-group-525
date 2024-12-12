import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsRoutingModule } from './forms.routing';
import { InputTextModule } from 'primeng/inputtext';




@NgModule({
  declarations: [
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    InputTextModule
  ]
})
export class FormsModule { }
