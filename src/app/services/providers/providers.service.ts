import { Injectable } from '@angular/core';
import { HttpService } from '@pichincha/angular-sdk/http';
import { Providers } from 'src/app/components/personas/form-personas/providers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  public getProviders(): Promise<Providers[]> {
    return this.http.get(this.rootUrl + 'provider/')
  }

}
