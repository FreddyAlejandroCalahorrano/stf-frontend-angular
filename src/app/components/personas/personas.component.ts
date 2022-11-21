import {Component, EventEmitter, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Persona} from './personas';
import {PersonService} from "../../services/person/person.service";
import {tap} from "rxjs/operators";
import {from, Observable} from "rxjs";
import {UiModalComponent} from '../ui-modal/ui-modal.component';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  selectPersona: Persona
  isEdit: boolean = true
  showViewDetail: boolean = false
  messageNoPerson: boolean = false
  personas: Promise<Persona[]>
  @ViewChild('modalConfirm', {static: true}) child: UiModalComponent;
  modal = {
    id: 0,
    txtBody: ''
  }
  messageBar = {
    show: false,
    status: '',
    text: '',
  }
  dataEditPerson: any
  showEditDelet: boolean = true
  currentTabId: string = "DP"
  tabElements = [
    {id: "DP", name: "Información Básica", isActive: true},
    {id: "P", name: "Perfiles", isActive: false},
    {id: "H", name: "Habilidades", isActive: false},
    {id: "CH", name: "Chapter", isActive: false},
  ]


  constructor(
    private _personService: PersonService
  ) {
  }


  onClickElementTab(elementId: string) {
    this.currentTabId = elementId
    this.tabElements.forEach((element) => {
      element.isActive = element.id == elementId
      this.showEditDelet = elementId == "DP";
    })
  }


  ngOnInit(): void {
    this.personas = this._personService.getPeople()

  }


  onAddPersonClick(value: boolean) {
    this.isEdit = false
    this.showViewDetail = false
  }

  onEditPersonaClick() {
    this.showViewDetail = false
  }

  getPeopleList(event?: Persona) {
    return from(this._personService.getPeople())
      .pipe(
        tap(personas => {
          if (event != undefined) {
            this.selectPersona = event

          } else {
            this.selectPersona = personas[0]
          }

        })
      ).toPromise()
  }

  onRemovePersonClick() {
    console.log('Eliminado')
    this.child.hide()
    let emitValue = this.selectPersona
    emitValue = {
      ...emitValue,
      user: this.selectPersona.user,
      state: "INACTIVO"
    }
    this._personService.updatePerson(emitValue, this.selectPersona.id)
      .then(() => {
        this.personas = this.getPeopleList()

        // this.personas.then((personas) => {
        //   this.selectPersona = personas[0]
        // })
        this.child.hide();
        this.setupMessageBar({
          status: "success",
          text: "Persona eliminada con éxito!"
        })

        /*this.messageBar.show = true
        this.messageBar.status = "success"
        this.messageBar.text = "Persona eliminada con éxito!"

        setTimeout(() => {
          this.messageBar.show = false
        }, 4000)*/

      }).catch((err) => {
      this.child.hide()
      this.setupMessageBar({
        status: "error",
        text: "Error al eliminar persona."
      })
      /*this.messageBar.show = true
      this.messageBar.status = "error"
      this.messageBar.text = "Error al eliminar persona"

      setTimeout(() => {
        this.messageBar.show = false
      }, 4000)*/
    })
  }

  onCancelClick(value: boolean) {
    this.isEdit = true
    this.showViewDetail = true
  }

  onSelectPerson(persona: Persona) {
    this.isEdit = true
    this.showViewDetail = true
    this.selectPersona = persona
  }

  onSubmitClick(emitValue: { isEdit: boolean, persona: Persona }) {
    this.isEdit = true
    this.showViewDetail = true
    console.log("personaUpdate", emitValue.persona)
    if (emitValue.isEdit) {
      emitValue.persona = {
        ...emitValue.persona,
        user: this.selectPersona.user,
        state: this.selectPersona.state
      }
      this._personService.updatePerson(emitValue.persona, this.selectPersona.id)
        .then((data) => {
          this.personas = this._personService.getPeople()
          this.selectPersona = data
          this.child.hide();
          this.setupMessageBar({
            status: "success",
            text: "Persona editada con éxito!"
          })

          /*this.messageBar.show = true
          this.messageBar.status = "success"
          this.messageBar.text = "Persona editada con exito!!"
          setTimeout(() => {
            this.messageBar.show = false
          }, 4000)*/

        }).catch((err) => {
        this.child.hide()
        this.setupMessageBar({
          status: "error",
          text: "Error al editar persona."
        })

        /*this.messageBar.show = true
        this.messageBar.status = "error"
        this.messageBar.text = "Error al editar persona"
        setTimeout(() => {
          this.messageBar.show = false
        }, 4000)*/
      })
    } else {
      emitValue.persona = {
        ...emitValue.persona,
        user: "luischi"
      }

      this._personService.addPerson(emitValue.persona)
        .then((data) => {
          this.personas = this._personService.getPeople()
          this.selectPersona = data
          this.setupMessageBar({
            status: "success",
            text: "Persona agregada con éxito!"
          })

          /*this.messageBar.show = true
          this.messageBar.status = "success"
          this.messageBar.text = "Persona agregada con exito!!"
          setTimeout(() => {
            this.messageBar.show = false
          }, 4000)*/
        }).catch((err) => {

        this.setupMessageBar({
          status: "error",
          text: "Error al agregar persona."
        })
        /*this.messageBar.show = true
        this.messageBar.status = "error"
        this.messageBar.text = "Error al agregar persona"
        setTimeout(() => {
          this.messageBar.show = false
        }, 4000)*/
      })
    }
  }

  noPerson(person: boolean) {
    this.messageNoPerson = person
  }

  setSelectedPerson(id: number) {

  }

  confirm() {
    switch (this.modal.id) {
      case 1:
        this.onRemovePersonClick();
        break;
      case 2:
        this.onSubmitClick(this.dataEditPerson)
        break;
      default:
        console.log("No such day exists!");
        break;
    }
    this.modal.id = 0
  }

  showModal(cases: number, emitValue: { isEdit: boolean, persona: Persona }) {
    switch (cases) {
      case 1:
        this.child.show()
        this.modal.id = 1
        this.modal.txtBody = "¿Esta seguro que desea eliminar a" + " " + this.selectPersona.name + " " + this.selectPersona.lastName + "?"
        break;
      case 2:
        if (this.isEdit) {
          this.child.show()
          this.modal.id = 2
          this.dataEditPerson = emitValue
          this.modal.txtBody = "¿Esta seguro que desea actualizar la indormacion de " + emitValue.persona.name + " " + emitValue.persona.lastName + "?"
        } else {
          this.onSubmitClick(emitValue)
        }
        break;
      default:
        console.log("No such day exists!");
        break;
    }
  }

  onClickMessage() {
    this.messageBar.show = false
  }

  setupMessageBar(messageBarStatus: { status: string, text: string }) {
    this.messageBar.show = true
    this.messageBar.status = messageBarStatus.status
    this.messageBar.text = messageBarStatus.text

    setTimeout(() => {
      this.messageBar.show = false
    }, 4000)
  }

}
