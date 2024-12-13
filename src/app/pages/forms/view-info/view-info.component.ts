import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTransferService } from '../../../services/data-transfer.service';
import { ContactFormService } from '../../../services/contact-form.service';
import { User } from '../../../interfaces/contact-form';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrl: './view-info.component.scss',
})
export class ViewInfoComponent implements OnInit, OnDestroy {
  arrayInfoJSON: any = [];
  constructor(
    private _serviceData: DataTransferService,
    private _serviceInfo: ContactFormService
  ) {}
  ngOnDestroy(): void {
    this._serviceData.postInfoSelected([]);
  }
  ngOnInit(): void {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const validateObjctLocalStorage = this.isObjectEmpty(users);
    if (!validateObjctLocalStorage) {
      const info = this._serviceData.getInfoArray();
      console.log(info);
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

  getInfo() {
    this._serviceInfo.getInfoJSON().subscribe({
      next: (data) => {
        this.arrayInfoJSON = data.users;
        const info = this._serviceData.getInfoArray();
        this.arrayInfoJSON.push(info);
        localStorage.setItem('users', JSON.stringify(this.arrayInfoJSON));
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
  editInfo(info: User) {
    console.log(info);
  }
}
