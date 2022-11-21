import { PersonChapter } from './personChapter';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChapterService } from 'src/app/services/chapter/chapter.service';
import { Persona } from '../personas';
import { Chapter } from './chapter';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UiModalComponent } from '../../ui-modal/ui-modal.component';


@Component({
  selector: 'app-chapter-personas',
  templateUrl: './chapter-personas.component.html',
  styleUrls: ['./chapter-personas.component.scss']
})
export class ChapterPersonasComponent implements OnInit {
  @Input() selectPersona: Persona
  @Output() emitStatusMessageBar: EventEmitter<{ status: string, text: string }> = new EventEmitter<{ status: string, text: string }>()

  chapterCatalog: Promise<Chapter[]>
  personChapterList: Promise<PersonChapter>
  chapterSubmit: any[] = []
  chapterSelect: string = ""
  errorMessage: boolean = false
  noChapterCatalog : boolean = false
  @ViewChild('modalConfirm', {static: true}) modal: UiModalComponent;
  modaltxtBody: string

  constructor(
    private _chapterService: ChapterService,
  ) { }

  ngOnInit(): void {
    this.chapterCatalog = this._chapterService.getChapters()
  }

  onclickcheckbox(event: any) {
    let elementIndex = this.chapterSubmit.findIndex((obj => obj.chapterName == event.detail.value));
    this.chapterSubmit[elementIndex].check = event.detail.checked;
  }

  asingChapterPerson(){
    this.modal.show()
    this.modaltxtBody = "¿Esta seguro que desea guardar los cambios?"
  }

  ngOnChanges(){
    this.chapterSubmit = []
    this.chapterSelect = ""
    this.errorMessage = false
    if (this.selectPersona != undefined) {
      from(this._chapterService.getChapterByPerson(this.selectPersona.id))
        .pipe(
          tap((chapters: PersonChapter) => {
            if(chapters.chapterToList != null ){
              this.chapterCatalog.then((data) => {
                for(let i=0; i<data.length; i++){
                    for(let j=0; j<chapters.chapterToList.length; j++){
                      if(data[i].chapterName == chapters.chapterToList[j].chapterName){
                        this.chapterSubmit.push({
                          id : data[i].id,
                          chapterName: data[i].chapterName,
                          check: true
                        })
                        this.chapterSelect = chapters.chapterToList[j].chapterName
                      }
                    }
                    if(this.chapterSelect != data[i].chapterName){
                      this.chapterSubmit.push({
                        id : data[i].id,
                        chapterName: data[i].chapterName,
                        check: false
                      })
                    }
                }
              })
            }
            else{
              this.chapterCatalog.then((data) => {
                for(let i=0; i<data.length; i++){
                  this.chapterSubmit.push({
                    id : data[i].id,
                    chapterName: data[i].chapterName,
                    check: false
                  })
                }
              })
            }
          })
        ).toPromise()
        .then(() => {
          this.errorMessage = true
        })
        .catch(() => {
          this.noChapterCatalog = true
        })
    }
  }

  confirm(){
    this.modal.hide()
    let chapterSend: Chapter[] = []
    this.chapterSubmit.map((data) => {
      if(data.check){
        chapterSend.push({
          id: data.id,
          chapterName: data.chapterName
        })
      }
    })
    this._chapterService.addPersonChapter({
      personTo: this.selectPersona,
      chapterToList: chapterSend
    }).then(() => {
      this.emitStatusMessageBar.emit({
        status: "success",
        text: `Se han realizado los cambios con éxito!`
      })

    }).catch(() => {
      this.emitStatusMessageBar.emit({
        status: "error",
        text: `Error al realizar los cambios!`
      })
    })
  }
}
