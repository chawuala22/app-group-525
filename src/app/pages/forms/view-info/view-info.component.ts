import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTransferService } from '../../../services/data-transfer.service';
import { ContactFormService } from '../../../services/contact-form.service';
import { User } from '../../../interfaces/contact-form';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrl: './view-info.component.scss',
})
export class ViewInfoComponent implements OnInit {
  arrayInfoJSON: any = [];
  validateState: string = '';
  constructor(
    private _serviceData: DataTransferService,
    private _serviceInfo: ContactFormService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.validateParameters();
    this.createRegister();
  }

  getInfo() {
    this._serviceInfo.getInfoJSON().subscribe({
      next: (data) => {
        this.arrayInfoJSON = data.users;
        const info = this._serviceData.getInfoArray();
        const validateObjct = this.isObjectEmpty(info);
        if (!validateObjct) {
          this.arrayInfoJSON.push(info);
        }
        localStorage.setItem('users', JSON.stringify(this.arrayInfoJSON));
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  validateParameters() {
    this.route.queryParams.subscribe((params) => {
      this.validateState = params['edit'];
      if (this.validateState === 'true') {
        const info = this._serviceData.getInfoUpdate();
        const validateObjct = this.isObjectEmpty(info);
        const index = Number(localStorage.getItem('index'));
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (!validateObjct) {
          users[index] = info;
          localStorage.setItem('users', JSON.stringify(users));
          this._serviceData.postInfoSelected([]);
        }
        this.router.navigate([], {
          queryParams: { edit: null },
        });
      }
    });
  }

  createRegister() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const validateObjctLocalStorage = this.isObjectEmpty(users);
    if (!validateObjctLocalStorage) {
      const info = this._serviceData.getInfoArray();
      this.arrayInfoJSON = users;
      const validateObjct = this.isObjectEmpty(info);
      if (!validateObjct) {
        this.arrayInfoJSON.push(info);
        localStorage.setItem('users', JSON.stringify(this.arrayInfoJSON));
      }
    } else {
      this.getInfo();
    }
  }
  isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
  editInfo(info: number) {
    console.log(this.arrayInfoJSON[info]);
    this._serviceData.postInfoSelected(this.arrayInfoJSON[info]);
    localStorage.setItem('index', JSON.stringify(info));
    this.router.navigate(['/form'], { queryParams: { edit: true } });
  }
}
