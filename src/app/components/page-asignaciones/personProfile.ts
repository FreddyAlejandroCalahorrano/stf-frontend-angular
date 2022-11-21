import {Persona} from "../personas/personas";
import {Profile} from "./profile";

export interface PersonProfile {
  id?: number;
  personTo: Persona,
  profileTos: Profile[],
}
