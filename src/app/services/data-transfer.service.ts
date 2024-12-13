import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private infoArraySendData: any = {};
  private infoUpdateData: any = {};

  constructor() {}

  postInfoSelected(info: any[]) {
    return (this.infoArraySendData = info);
  }

  postInfoUpdated(info: any[]) {
    return (this.infoUpdateData = info);
  }

  getInfoArray() {
    return this.infoArraySendData;
  }

  getInfoUpdate() {
    return this.infoUpdateData;
  }
}
