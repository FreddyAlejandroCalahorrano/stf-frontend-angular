import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Persona} from "../personas/personas";
import {PersonService} from "../../services/person/person.service";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Profile} from "./profile";
import {PersonProfile} from "./personProfile";
import {from} from "rxjs";
import {tap} from "rxjs/operators";
import {UiModalComponent} from "../ui-modal/ui-modal.component";
import {ModalTestComponent} from "./modal-test/modal-test.component";
import {DialogService} from "../../common/modal/dialog.service";
import { ProfilesService } from 'src/app/services/profiles/profiles.service';

@Component({
  selector: 'app-page-asignaciones',
  templateUrl: './page-asignaciones.component.html',
  styleUrls: ['./page-asignaciones.component.scss']
})
export class PageAsignacionesComponent implements OnInit {

  personas: Promise<Persona[]>
  profilesCatalog: Promise<Profile[]>
  personProfileList: Promise<PersonProfile[]>

  selectPersona: Persona
  selectOptionsProfile: any[] = []

  personaProfileFormGroup: FormGroup
  profilesList: Profile[] = []
  personProfile: PersonProfile[] = []

  selectItems: any[]

  @ViewChild('uiModal', {static: true}) uiModal!: UiModalComponent
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  fg = new FormGroup({
    select: new FormControl(''),
  });

  messageNoPerson: boolean = false

  constructor(
    private _personService: PersonService,
    private modalBsService: DialogService,
    private fb: FormBuilder,
    private _profileService: ProfilesService
  ) {
    this.personaProfileFormGroup = this.fb.group({
      profiles: new FormArray([], {
        validators: []
      }),
      mainProfile: ['', []]
    })


    this.profilesCatalog = from(this._profileService.getProfiles())
      .pipe(
        tap((profiles) => {
          this.profilesList = profiles
          profiles.forEach(() => {
            this.profiles.push(new FormControl(false))
          })
        })
      ).toPromise()

  }

  setValue() {
    /*this.fg.patchValue({
      select: 3
    })*/

    this.modalBsService.addDialog(ModalTestComponent, {titleModal: 'Modal Test', data: {}})
      .subscribe()

  }

  ngOnInit(): void {

    this.selectItems = [
      {value: 1, label: "BACK",},
      {value: 2, label: "FRONT",},
      {value: 3, label: "DEVOPS",}
    ]

    // this.selectInput.valueChanges
    //   .subscribe(console.log)


    // setTimeout(() => {
    //     console.log(this.selectInput)
    //     this.selectInput.setValue(3)
    //   }
    //   , 3000)


    this.personas = this._personService.getPeople()

    this.profiles.valueChanges.subscribe((value: []) => {

    /*  this.selectOptionsProfile = []
      let principals: boolean[] = []
      if (value.every(v => v === false)) {
        this.mainProfile.patchValue('')
      } else {
        this.personProfileList?.then((personProfiles) => {
          for (let i = 0; i < value.length; i++) {
            if (value[i]) {
              let isPrincipal = personProfiles.filter((personProfiles): string => {
                if (personProfiles.profileTo.id == i + 1 && personProfiles.principal == "Si") {
                  return personProfiles.principal
                } else {
                  return
                }
              })?.[0]?.principal == "Si"
              principals.push(isPrincipal)

              if (isPrincipal) {
                this.selectOptionsProfile.push({
                  name: this.profilesList[i].nameProfile,
                })
                this.mainProfile.setValue(this.profilesList[i].nameProfile)
              } else {
                this.selectOptionsProfile.push({
                  name: this.profilesList[i].nameProfile,
                })
              }
            }
          }
        })
      }
      if (principals.every(v => v === false)) {
        this.mainProfile.patchValue('')
      }*/
    })

    this.mainProfile.valueChanges.subscribe((value) => {
      // console.log("SELECT VALUE", value)

    })
  }

  onSelectPerson(persona: Persona) {
    /*this.selectPersona = persona

    this.personProfileList = from(this._personService.getProfilesByPerson(this.selectPersona.id))
      .pipe(
        tap((personProfilesList) => {
          this.personProfile = personProfilesList
          let checkedProfiles: boolean[] = new Array(this.profiles.length).fill(false)

          personProfilesList.forEach(({profileTo, principal}) => {
            checkedProfiles[(profileTo.id - 1)] = true

            principal == "Si" ? this.mainProfile.patchValue(profileTo.nameProfile) : null

            console.log("PERFIL PRINCIPAL", profileTo.nameProfile)

            this.selectOptionsProfile.push({
              name: profileTo.nameProfile,
              /!*  selected: principal == "Si"*!/
            })
          })
          this.profiles.patchValue(checkedProfiles)

        })
      ).toPromise()
*/
    /* this.personProfileList = this._personService.getProfilesByPerson(this.selectPersona.id)

     this.personProfileList.then((personProfiles) => {
       let checkedProfiles: boolean[] = new Array(this.profiles.length).fill(false)
       this.selectOptionsProfile = []

       personProfiles.forEach(({profileTo, principal}) => {
         checkedProfiles[(profileTo.id - 1)] = true

         if (principal == "Si") {
           this.selectOptionsProfile.push({
             name: profileTo.nameProfile,
           })
           this.mainProfile.patchValue(profileTo.nameProfile)
         } else {
           this.selectOptionsProfile.push({
             name: profileTo.nameProfile,
           })
         }


       })
       this.profiles.patchValue(checkedProfiles)
     })*/
  }

  onSubmit() {
    console.log("SEND DATA", this.mainProfile.value)
    let profileTos: any[] = []
    this.profiles.value.forEach((bool: boolean, index: number) => {
      if (bool) {
        profileTos.push({
          id: this.profilesList[index].id,
          nameProfile: this.profilesList[index].nameProfile,
          principal: this.mainProfile.value == this.profilesList[index].nameProfile ? "Si" : "No"
        })
      }
    })

    console.log("DATA", {
      personTo: this.selectPersona,
      profileTos: profileTos
    })

    if (this.personaProfileFormGroup.valid) {
      this._profileService.addPersonProfile({
        personTo: this.selectPersona,
        profileTos: profileTos
      }).then((data) => {
        console.log("RESPONSE", data)
        this.personas = this._personService.getPeople()
      }).catch((err) => {
        console.log("ERR", err)
      })
    }

  }

  get profiles() {
    return this.personaProfileFormGroup.get('profiles') as FormArray
  }

  get mainProfile() {
    return this.personaProfileFormGroup.get('mainProfile')
  }

  noPerson(person: boolean) {
    this.messageNoPerson = person
  }


}

