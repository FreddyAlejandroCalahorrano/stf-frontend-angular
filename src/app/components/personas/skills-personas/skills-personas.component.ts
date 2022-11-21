import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {from, Observable} from "rxjs";
import {UiModalComponent} from "../../ui-modal/ui-modal.component";
import {PersonService} from "../../../services/person/person.service";
import {catchError, map, tap} from "rxjs/operators";
import {Persona} from "../personas";
import {PersonaSkills} from "../../../types/personaSkills";
import {Skill} from "../../../types/skill";
import {DialogService} from "../../../common/modal/dialog.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { SkillsService } from 'src/app/services/skills/skills.service';

@Component({
  selector: 'app-skills-personas',
  templateUrl: './skills-personas.component.html',
  styleUrls: ['./skills-personas.component.scss']
})
export class SkillsPersonasComponent implements OnInit, OnChanges {

  @Input() selectPersona: Persona
  @Output() emitStatusMessageBar: EventEmitter<{ status: string, text: string }> = new EventEmitter<{ status: string, text: string }>()


  personSkillList$: Promise<Skill[]> /*= [
    {typeSkill: "Dev Front", name: "SAS Data Integration"},
    {typeSkill: "QA", name: "RPA"},
    {typeSkill: "Dev Back", name: "Java"},
  ]*/

  personSkillList: Skill[] = []

  typeSkillList$: Promise<{ label: string; value: string }[]> /*= from([[
    {value: "Dev Front", label: "Dev Front"},
    {value: "QA", label: "QA"},
    {value: "Dev Back", label: "Dev Back"}
  ]])*/


  skillsCatalog$: Promise<Skill[]>

  searchNameSkill: string[] = ["", ""]

  fg = new FormGroup({
    typeSkills: new FormControl(''),
  });

  fbModal = new FormGroup({
    typeSkillsModal: new FormControl(''),
  });

  submitSkills: Skill[] = []

  @ViewChild('modalConfirm', {static: true}) modalConfirm: UiModalComponent;
  @ViewChild('modalAddSkills', {static: true}) modalAddSkills: UiModalComponent;


  modal = {
    txtBody: ''
  }

  selectedSkill: any

  constructor(
    private _personService: PersonService,
    private _skillService: SkillsService,
    private _dialogService: DialogService
  ) {
  }

  ngOnInit(): void {


    this.typeSkillList$ = from(this._skillService.getTypeSkills()
    ).pipe(
      map((typeSkills) => {
        return typeSkills.map((type) => {
          return {value: type, label: type}
        })
      })
    ).toPromise()

    console.log(this.selectPersona.id)

    /*this.personSkillList$ = from(this._personService.getSkillsByPersonId(this.selectPersona.id)
    ).pipe(
      map(({skillToList}) => skillToList),
      catchError((err)=>{
        console.log(err)
        return []
      })
    ).toPromise()*/

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.selectPersona !== undefined) {
      this.fg?.get('typeSkills')?.patchValue('')
      this.personSkillList$ = from(this._skillService.getSkillsByPersonId(this.selectPersona.id)
      ).pipe(
        map(({skillToList}) => {
          this.personSkillList = skillToList != null ? skillToList : []
          return this.personSkillList
        }),
      ).toPromise()
    }

  }

  onDeletePersonaSkill(skill: Skill) {
    this.modal.txtBody = `¿Está seguro que desea eliminar la skill ${skill.nameSkill}?`
    this.modalConfirm.show()
    this.selectedSkill = skill
    console.log(skill)
  }

  onConfirmDeletePersonaSkill() {

    let deletedPersonSkills = {
      id: 1,
      personTo: this.selectPersona,
      skillTo: this.selectedSkill,
      user: "luischi",
      state: "ACTIVO"
    }

    console.log(deletedPersonSkills)

    this._skillService.deleteSkill(deletedPersonSkills).then((data) => {
      this.modalConfirm.hide()
      this.emitStatusMessageBar.emit({
        status: "success",
        text: `Habilidad ${this.selectedSkill.nameSkill} eliminada con éxito!`
      })
      this.fg?.get('typeSkills')?.patchValue('')
      this.personSkillList$ = from(this._skillService.getSkillsByPersonId(this.selectPersona.id)
      ).pipe(
        map(({skillToList}) => {
          this.personSkillList = skillToList != null ? skillToList : []
          return this.personSkillList
        }),
      ).toPromise()
    }).catch(() => {
      this.emitStatusMessageBar.emit({
        status: "error",
        text: `Error al eliminar la skill ${this.selectedSkill.nameSkill}.`
      })
    })
  }

  onAddPersonaSkill() {
    this.modalAddSkills.show()
    this.searchNameSkill[1] = ""
    this.skillsCatalog$ = this._skillService.getSkillExpect(this.personSkillList)
  }

  onClickCheckbox(event: any, skill: Skill) {
    if (event?.detail?.checked) {
      this.submitSkills?.push(skill)
    } else {
      this.submitSkills = this.submitSkills.filter((data) => data.id != skill.id)
    }
  }

  onAddSkills() {
    if (this.submitSkills.length > 0) {
      let personSkills: PersonaSkills

      personSkills = {
        personTo: this.selectPersona,
        skillToList: this.submitSkills,
      }

      this._skillService.addSkills(personSkills).then((data) => {
        this.modalAddSkills.hide()
        this.emitStatusMessageBar.emit({
          status: "success",
          text: "Habilidades actualizadas."
        })

        this.fg?.get('typeSkills')?.patchValue('')

        this.personSkillList$ = from(this._skillService.getSkillsByPersonId(this.selectPersona.id)
        ).pipe(
          map(({skillToList}) => {
            this.personSkillList = skillToList != null ? skillToList : []
            return this.personSkillList
          }),
        ).toPromise()

      }).catch(() => {
        this.emitStatusMessageBar.emit({
          status: "error",
          text: "Error al agregar habilidades."
        })
      })
    }
  }

}
