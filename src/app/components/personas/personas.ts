import {Country} from "./form-personas/country";
import { Providers } from "./form-personas/providers";

export interface Persona {
  id: number,
  name: string,
  lastName: string,
  email: string,
  bornDate: string,
  identificationCard: string,
  phoneNumber: string
  homeAddress: string
  countryTo: Country
  age: number,
  role: string,
  user: string ,
  state: string,
  providerTo?: Providers
}
