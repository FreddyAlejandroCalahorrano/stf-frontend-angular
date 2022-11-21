import {Injectable} from '@angular/core';
import {HttpService} from "@pichincha/angular-sdk/http";
import {Persona} from "../../components/personas/personas";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PersonService {


  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) {
  }

  public getPeople(): Promise<Persona[]> {
    return this.http.get(this.rootUrl + 'person')
  }

  public updatePerson(person: Persona, id: number): Promise<Persona> {
    return this.http.put(this.rootUrl + 'person/' + id, person)
  }

  public addPerson(person: Persona): Promise<Persona> {
    console.log("PERSONA ENVIADA:", person)
    return this.http.post(this.rootUrl + 'person', person)
  }

  public removePerson(person: Persona, id: number): Promise<Persona> {
    return this.http.put(this.rootUrl + 'person', person)
  }
  
}
