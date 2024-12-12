import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  sexs = [
    {value: 'hombre', viewValue: 'Hombre'},
    {value: 'mujer', viewValue: 'Mujer'},
  ];
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const validateState = params['edit'];
      console.log('ID:', validateState);
      if (validateState) {
      } else {
        console.log('Holi');
      }
    });
  }
}
