import { Injectable } from '@angular/core';
import { HttpService } from '@pichincha/angular-sdk/http';
import { Role } from 'src/app/components/personas/form-personas/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  public getRole(): Promise<Role[]> {
    return this.http.get(this.rootUrl + 'role')
  }
}
