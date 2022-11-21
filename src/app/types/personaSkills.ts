import {Persona} from "../components/personas/personas";
import {Skill} from "./skill";

export interface PersonaSkills {
  id?: number,
  personTo: Persona,
  skillToList: Skill[],
  "user"?: string
  "state"?: string
}
