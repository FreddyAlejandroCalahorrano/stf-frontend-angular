import {Country} from './country';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Persona} from "../personas";
import {PersonService} from 'src/app/services/person/person.service';
import {Role} from './role';
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import { Providers } from './providers';
import { CountryService } from 'src/app/services/country/country.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';

@Component({
  selector: 'app-form-personas',
  templateUrl: './form-personas.component.html',
  styleUrls: ['./form-personas.component.scss']
})
export class FormPersonasComponent implements OnInit, OnChanges {

  submitted: boolean = false;
  errorsName: string = "El nombre es requerido"
  @Input() personaEdit: Persona
  @Input() isEdit: boolean = true
  @Output() cancelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() submitEventEmitter: EventEmitter<{ isEdit: boolean, persona: Persona }> = new EventEmitter<{ isEdit: boolean, persona: Persona }>()


  personaFormGroup: FormGroup

  listCountry: Observable<any[]>
  roleSelect: Promise<Role[]>
  listProviders: Observable<any[]>
  submitPerson: Persona
  noProfilesCatalog: boolean = false
  countrySelect: Country
  providerSelect: Providers

  constructor(
    private _personService: PersonService,
    private _countryService: CountryService,
    private _roleService: RolesService,
    private _providerService: ProvidersService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {

    this.listCountry = from(this._countryService.getCountry())
      .pipe(
        map(list => list.map(item => ({value: item.code, label: item.description})))
      )
    this.roleSelect = this._roleService.getRole()

    this.countryTo.valueChanges.subscribe(value => {
      this.listCountry.subscribe(data => {
        console.log(data)
        for(let i=0; i<data.length; i++){
          if(value == data[i].value){
            this.countrySelect = {
              code: data[i].value,
              description: data[i].label,
            }
          }
        }
      })

    })

    this.listProviders = from(this._providerService.getProviders())
      .pipe(
        map(list => list.map(item => ({value: item.id, label: item.providerName})))
      )

    this.providerTo.valueChanges.subscribe(value => {
      this.listProviders.subscribe(data => {
        console.log(data)
        for(let i=0; i<data.length; i++){
          if(value == data[i].value){
            this.providerSelect = {
              id: data[i].value,
              providerName: data[i].label,
              user: "luischi",
              state: "ACTIVO"
            }
          }
        }
      })
    })
  }

  buildForm() {
    this.personaFormGroup = this.fb.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        updateOn: 'change'
      }],
      lastName: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      }],
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }],
      bornDate: ['', {
        validators: [Validators.required],
      }],
      role: ['', {
        validators: [Validators.required],
      }],
      homeAddress: ['', {
        validators: [Validators.required],
      }],
      identificationCard: ['', {
        validators: [Validators.required],
      }],
      phoneNumber: ['', {
        validators: [Validators.required],
      }],
      countryTo: ['', [Validators.required]],
      providerTo: ['', []]
    })
  }

  ngOnChanges() {
    if (this.personaEdit != undefined) {
      this.addOrEditSetUp()
    }
  }

  onClickSelectCountry(item: Country) {
    console.log(item)
  }

  addOrEditSetUp() {
    this.buildForm()
    console.log("personaEdit", this.personaEdit)

    setTimeout(() => {

      if (this.isEdit) {
        this.personaFormGroup?.patchValue({
          name: this.personaEdit.name,
          lastName: this.personaEdit.lastName,
          email: this.personaEdit.email,
          bornDate: this.personaEdit.bornDate,
          role: this.personaEdit.role,
          homeAddress: this.personaEdit.homeAddress,
          identificationCard: this.personaEdit.identificationCard,
          phoneNumber: this.personaEdit.phoneNumber,
          countryTo: this.personaEdit.countryTo.code,
          providerTo: this.personaEdit.providerTo.id
        })

      }
    }, 1000)
  }

  onSubmit() {

    this.submitted = true
    if (this.personaFormGroup.invalid) {
      return;
    } else {

      this.submitPerson = {
        ...this.personaFormGroup.value,
        countryTo: this.countrySelect,
        providerTo: this.providerSelect
      }
      console.log("persona submitted",  this.submitPerson)
      this.submitEventEmitter.emit({
        isEdit: this.isEdit,
        persona: this.submitPerson
      })

    }
  }

  onCancel() {
    this.isEdit = true
    this.cancelEventEmitter.emit(true)
  }

  handleSelectedItem(event: any) {
    // this.code.setValue(event.detail.value)
    // this.description.setValue(event.detail.label)
  }

  get name() {
    return this.personaFormGroup.get('name');
  }

  get lastName() {
    return this.personaFormGroup.get('lastName');
  }

  get email() {
    return this.personaFormGroup.get('email');
  }

  get bornDate() {
    return this.personaFormGroup.get('bornDate');
  }

  get role() {
    return this.personaFormGroup.get('role');
  }

  get homeAddress() {
    return this.personaFormGroup.get('homeAddress');
  }

  get identificationCard() {
    return this.personaFormGroup.get('identificationCard');
  }

  get phoneNumber() {
    return this.personaFormGroup.get('phoneNumber');
  }

  get countryTo() {
    return this.personaFormGroup.get('countryTo');
  }

  get providerTo(){
    return this.personaFormGroup.get('providerTo');
  }

  // get code() {
  //   return this.countryTo.get('code');
  // }
  //
  // get description() {
  //   return this.countryTo.get('description');
  // }
}

