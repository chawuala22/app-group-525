import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataTransferService } from '../../../services/data-transfer.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  show_department: boolean = false;
  genders = ['Hombre', 'Mujer'];
  countries: string[] = ['Colombia', 'Argentina', 'México'];
  departments: string[] = ['Cundinamarca', 'Antioquia', 'Magdalena'];
  cities: string[] = [];
  validateState: string = '';
  labelButton: string = 'Enviar';

  contactForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _serviceData: DataTransferService
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.validateState = params['edit'];
      if (this.validateState === 'true') {
        const info = this._serviceData.getInfoArray();
        console.log(info);
        this.show_department = true;
        this.validateCountry(info.country);
        this.contactForm.patchValue(info);
      }
    });

    this.labelButton = this.validateState === 'true' ? 'Update' : 'Enviar';
  }

  initForm() {
    this.contactForm = this.fb.group({
      sex: ['', Validators.required],
      date_birthday: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      addres: ['', Validators.required],
      house: ['', Validators.required],
      country: ['', Validators.required],
      City: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  validateAge(event: any) {
    console.log(event);
    const age = new Date().getFullYear() - new Date(event).getFullYear();
    if (age < 18) {
      Swal.fire('Su edad es inferior a los 18 años');
      this.contactForm.get('date_birthday')?.setValue('');
    }
  }

  validateCountry(event: Event) {
    const country = String(event);
    const countryConfig: Record<
      string,
      { showDepartment: boolean; cities: string[] }
    > = {
      Colombia: {
        showDepartment: true,
        cities: ['Bogotá', 'Medellín', 'Cali'],
      },
      Argentina: {
        showDepartment: false,
        cities: ['Buenos Aires', 'Córdoba', 'Santa Fe'],
      },
      default: {
        showDepartment: false,
        cities: ['Ciudad de Mexico', 'Monterrey', 'Cancún'],
      },
    };

    const config = countryConfig[country] || countryConfig['default'];

    this.show_department = config.showDepartment;

    if (this.show_department) {
      this.contactForm.addControl(
        'Deparment',
        new FormControl('', Validators.required)
      );
    } else {
      this.contactForm.removeControl('Deparment');
      this.contactForm.updateValueAndValidity();
    }

    this.cities = config.cities;
  }

  sendInfo() {
    const fecha = new Date(this.contactForm.get('date_birthday')?.value);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    const fechaFormateada = `${año}-${mes}-${dia}`;
    this.contactForm.patchValue({
      date_birthday: fechaFormateada,
    });

    if (this.contactForm.valid) {
      if (this.validateState === 'true') {
        this.router.navigate(['/view-info'], { queryParams: { edit: true } });
        this._serviceData.postInfoUpdated(this.contactForm.value);
      } else {
        this.router.navigate(['view-info']);
        this._serviceData.postInfoSelected(this.contactForm.value);
      }
    } else {
      this.contactForm.markAllAsTouched();
      Swal.fire({
        title: 'Error',
        text: 'Campos obligatorios faltantes',
        icon: 'warning',
      });
    }
  }
}
