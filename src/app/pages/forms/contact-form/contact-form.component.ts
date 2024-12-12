import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  contactForm!: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const validateState = params['edit'];
      console.log('ID:', validateState);
      if (validateState) {
      } else {
        console.log('Holi');
      }
    });
  }

  initForm() {
    this.contactForm = this.fb.group({
      sexo: [''],
      email: [''],
      food: [''],
    });
  }

  sendInfo() {
    console.log(this.contactForm.value);
  }
}
