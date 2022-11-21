import {Persona} from '../personas';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Profile} from "../../page-asignaciones/profile";
import {PersonProfile} from "../../page-asignaciones/personProfile";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PersonService} from "../../../services/person/person.service";
import {from} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { ProfilesService } from 'src/app/services/profiles/profiles.service';

@Component({
  selector: 'app-profiles-person',
  templateUrl: './profiles-person.component.html',
  styleUrls: ['./profiles-person.component.scss']
})
export class ProfilesPersonComponent implements OnInit, OnChanges {
  @Output() emitUpdatePeople: EventEmitter<Persona> = new EventEmitter<Persona>()
  @Output() emitStatusMessageBar: EventEmitter<{ status: string, text: string }> = new EventEmitter<{ status: string, text: string }>()
  @Input() selectPersona: Persona
  noProfilesCatalog: boolean = false


  profilesCatalog$: Promise<Profile[]>
  personProfileList$: Promise<PersonProfile>

  selectOptionsProfile: any[] = []

  personaProfileFormGroup: FormGroup
  profilesList: Profile[] = []
  personProfile: PersonProfile

  constructor(
    private _personService: PersonService,
    private _profileService: ProfilesService,
    private fb: FormBuilder,
  ) {
    this.personaProfileFormGroup = this.fb.group({
      profiles: new FormArray([], {
        validators: []
      }),
      mainProfile: ['', []]
    })

    this.profilesCatalog$ = from(this._profileService.getProfiles())
      .pipe(
        tap((profiles) => {
          this.profilesList = profiles
          profiles.forEach(() => {
            this.profiles.push(new FormControl(false))
          })
        }),
      ).toPromise()

    this.profilesCatalog$.catch(() => {
      this.noProfilesCatalog = true
    })
  }

  ngOnInit(): void {
    this.profiles.valueChanges.subscribe((value: []) => {
      console.log("checkboxs profiles value", value)


      this.selectOptionsProfile = []
      if (value.every(v => v === false)) {
        this.mainProfile.patchValue('')
      } else {
        if (this.personProfile != undefined) {

          let principalProfile: Profile

          if (this.personProfile.profileTos !== null) {
            principalProfile = this.getPrincipalProfile(this.personProfile)
          }


          for (let i = 0; i < value.length; i++) {
            if (value[i]) {
              this.selectOptionsProfile.push({
                value: this.profilesList[i].nameProfile,
                label: this.profilesList[i].nameProfile,
              })
            }
          }

          if (principalProfile == undefined) {
            this.mainProfile.patchValue('')
          } else {
            let isPrincipalProfileChecked: boolean = false
            this.selectOptionsProfile.forEach(({value}) => {
              if (value == principalProfile.nameProfile) {
                isPrincipalProfileChecked = true
              }
            })
            // console.log("isPrincipalProfileChecked", isPrincipalProfileChecked)

            setTimeout(() => {
              this.mainProfile.setValue(
                isPrincipalProfileChecked ? principalProfile.nameProfile : ''
              )
            }, 300)

            // console.log(this.mainProfile.value)

          }


        }
      }
    })

    this.mainProfile.valueChanges.subscribe((value) => {
      /*console.log("select mainProfile value", value)*/
    })
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.selectPersona !== undefined) {
      console.log(this.selectPersona)
      this.personProfileList$ = from(this._profileService.getProfilesByPerson(this.selectPersona.id))
        .pipe(
          tap((personProfile: PersonProfile) => {
            this.personProfile = personProfile
            let checkedProfiles: boolean[] = new Array(this.profiles.length).fill(false)
            if (personProfile.profileTos != null) {
              personProfile.profileTos.forEach((profile: Profile) => {
                checkedProfiles[(profile.id - 1)] = true
                profile.principal == "Si" ? this.mainProfile.patchValue(profile.nameProfile) : null

                this.selectOptionsProfile.push({
                  value: profile.nameProfile,
                  label: profile.nameProfile,
                })
              })
            }
            this.profiles.patchValue(checkedProfiles)
          })
        ).toPromise()
    }

  }

  onSubmit() {
    console.log("SEND DATA", this.personaProfileFormGroup.value)
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
        console.log("RESPONSE", data.personTo)
        this.emitUpdatePeople.emit(data.personTo)
        this.emitStatusMessageBar.emit({
          status: "success",
          text: "Perfiles actualizados."
        })

      }).catch((err) => {
        console.log("ERR", err)
        this.emitStatusMessageBar.emit({
          status: "error",
          text: "Error al actualizar perfiles."
        })
      })
    }

  }

  get profiles() {
    return this.personaProfileFormGroup.get('profiles') as FormArray
  }

  get mainProfile() {
    return this.personaProfileFormGroup.get('mainProfile')
  }

  getPrincipalProfile(profiles: PersonProfile) {
    let principalProfile: Profile
    console.log("profiles", profiles)
    profiles.profileTos.forEach((profile) => {
      if (profile.principal == "Si") {
        principalProfile = profile
      }
    })
    return principalProfile

  }

}
