import { Injectable } from '@angular/core';
import { HttpService } from '@pichincha/angular-sdk/http';
import { Country } from 'src/app/components/personas/form-personas/country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  public getCountry(): Promise<Country[]> {
    return this.http.get(this.rootUrl + 'country')
  }
}
