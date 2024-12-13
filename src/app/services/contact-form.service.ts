import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  ContactForm } from '../interfaces/contact-form';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  private urlBase = 'https://cincoveinticinco.com/users.json';
  constructor(private _httpClient: HttpClient) {}

  getInfoJSON() {
    return this._httpClient.get<ContactForm>(this.urlBase);
  }
}
