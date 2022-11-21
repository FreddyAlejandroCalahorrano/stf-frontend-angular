import { Injectable } from '@angular/core';
import { HttpService } from '@pichincha/angular-sdk/http';
import { PersonProfile } from 'src/app/components/page-asignaciones/personProfile';
import { Profile } from 'src/app/components/page-asignaciones/profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  public getProfiles(): Promise<Profile[]> {
    return this.http.get(this.rootUrl + 'profile')
  }

  public getProfilesByPerson(id: number): Promise<PersonProfile> {
    return this.http.get(this.rootUrl + 'personProfile/' + id)
  }

  public addPersonProfile(personProfiles: any) {
    return this.http.post(this.rootUrl + 'personProfile/', personProfiles)
  }
}
