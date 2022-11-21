import {Persona} from '../personas';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.scss']
})
export class ListPersonsComponent implements OnInit, OnChanges {

  @Output() addPerson: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() noPerson: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitSelectPerson: EventEmitter<Persona> = new EventEmitter<Persona>()
  @Input() data: Promise<Persona[]>
  @Input() selectPersona: Persona
  @Input() showAddPersonButton: boolean = true
  searchText: string = ""
  selectedPersonId: number
  enableAddButton: boolean = true
  messageNoPerson:boolean
  personasLength:number

  constructor() {
  }

  ngOnInit(): void {
    this.data.then((personas) => {
      if (personas.length > 0) {
        this.emitSelectPerson.emit(personas[0])
        this.selectedPersonId = personas[0].id
        this.personasLength = personas.length
      }
      this.enableAddButton = false
    }).catch((error) => {
      this.noPerson.emit(true)
      this.messageNoPerson = true
    })

    /* if (this.data.length > 0) {
       this.emitSelectPerson.emit(this.data[0])
       this.selectedPersonId = this.data[0].id

     }*/
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectPersona !== undefined) {
       this.selectedPersonId = this.selectPersona.id
    }
  }

  onClickAddPerson() {
    this.addPerson.emit(false)
  }

  onClickSelectPerson(item: Persona) {
    this.emitSelectPerson.emit(item)
    this.selectedPersonId = item.id

  }

  search() {
    console.log(this.searchText)
  }

  setSelectedPerson(id: number) {

  }
}
