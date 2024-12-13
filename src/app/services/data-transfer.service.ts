import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private infoArraySendData: any = {};

  constructor() {}

  postInfoSelected(info: any[]) {
    return (this.infoArraySendData = info);
  }

  getInfoArray() {
    return this.infoArraySendData;
  }
}
