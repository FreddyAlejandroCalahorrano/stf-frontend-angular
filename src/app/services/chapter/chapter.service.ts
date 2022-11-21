import { Injectable } from '@angular/core';
import { HttpService } from '@pichincha/angular-sdk/http';
import { Chapter } from 'src/app/components/personas/chapter-personas/chapter';
import { PersonChapter } from 'src/app/components/personas/chapter-personas/personChapter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  public getChapters(): Promise<Chapter[]>{
    return this.http.get(this.rootUrl + 'chapter/')
  }

  public getChapterByPerson(id: number): Promise<PersonChapter> {
    return this.http.get(this.rootUrl + 'personChapter/' + id)
  }

  public addPersonChapter(personChapter: any) {
    return this.http.post(this.rootUrl + 'personChapter/', personChapter)
  }
}

