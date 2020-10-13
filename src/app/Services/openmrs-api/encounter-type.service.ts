import { Injectable } from '@angular/core';
import { SessionStorageService } from '../storage/session-storage.service';
import { Constants } from '../constants';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class EncounterTypeService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    this.baseUrl = sessionStorage.getItem(Constants.BASE_URL);
  }

  getEncounterTypes() {
    return this.http.get<any>(`${this.baseUrl}/ws/rest/v1/encountertype`);
  }
}
