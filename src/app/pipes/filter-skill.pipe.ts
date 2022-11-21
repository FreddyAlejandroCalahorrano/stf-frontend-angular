import {Pipe, PipeTransform} from '@angular/core';
import {Persona} from "../components/personas/personas";
import {Skill} from "../types/skill";

@Pipe({
  name: 'filterSkill'
})
export class FilterSkillPipe implements PipeTransform {

  transform(array: Skill[], nameFilter?: string, typeFilter?: string): any {
   /* console.log("name", nameFilter)*/
   /* console.log("type", typeFilter)*/

    let returnArray:Skill[]

    returnArray = array
    console.log("name", nameFilter)
    console.log("type", typeof nameFilter)

    nameFilter = nameFilter.toUpperCase()

    if(!array) {
      return array
    } else{
      returnArray = returnArray.filter(({nameSkill})=>
        nameSkill.toUpperCase().includes(nameFilter)
      )

      if(typeFilter != undefined && typeFilter != '')  {
        returnArray = returnArray.filter(({typeSkill})=>
          typeSkill == typeFilter
        )
      }

    }




    return  returnArray
    /*if(!array || !nameFilter || !typeFilter){
      return array
    }else{
      nameFilter = nameFilter.toUpperCase()

      if(!nameFilter || !typeFilter){
       return
      }

      return array.filter(({nameSkill, typeSkill}) =>
        nameSkill.toUpperCase().includes(nameFilter) && typeSkill.toUpperCase() == typeFilter
      );
    }*/


    /*if (!array || !nameFilter ) return array
    return array.filter(({nameSkill, typeSkill}) =>
      nameSkill.toUpperCase().includes(nameFilter) && typeSkill.toUpperCase() == typeFilter
    );*/

  }

}
