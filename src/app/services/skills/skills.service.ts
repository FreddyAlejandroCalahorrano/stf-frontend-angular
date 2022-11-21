import { Injectable } from '@angular/core';
import { HttpService } from '@pichincha/angular-sdk/http';
import { PersonaSkills } from 'src/app/types/personaSkills';
import { Skill } from 'src/app/types/skill';
import { environment } from 'src/environments/environment';
import { from } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  public getTypeSkills(): Promise<string[]> {
    return this.http.get(`${this.rootUrl}typeSkills`)
  }

  public getSkillsByPersonId(id: number): Promise<PersonaSkills> {
    return this.http.get(`${this.rootUrl}personSkill/${id}`)

  }

  public deleteSkill(personSkills: any) {
    return this.http.put(`${this.rootUrl}personSkill`, personSkills)
  }

  public getSkills(): Promise<Skill[]> {
    return this.http.get(`${this.rootUrl}skill`)
  }

  public getSkillExpect(deletedSkills: Skill[]): Promise<Skill[]> {
    return from(this.getSkills()).pipe(
      /*tap((data)=>{
        console.log("deletedSkills", deletedSkills)
        console.log("TAP 1:", data)
      }),*/
      map((skills: Skill[]) => {
        return skills.filter((skill) => {
          let noDeletedSkill: boolean = true
          deletedSkills.forEach(({id}) => {
            if (skill.id == id) {
              noDeletedSkill = false
            }
          })
          return noDeletedSkill ? skill : null;
        })
      }),
      /*tap((data)=>{
        console.log("TAP 2:", data)
      }),*/
    ).toPromise()
  }

  public addSkills(personSkills: PersonaSkills) {
    return this.http.post(`${this.rootUrl}personSkill`, personSkills)
  }
}
