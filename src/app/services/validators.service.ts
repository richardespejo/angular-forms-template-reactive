import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [ algo :string ] : boolean
}


@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor() { }

  //valida que el usuario ya exista en la BD "deberia apuntar a peticion http del back" por el ejercicio esta hardcode
  existeUsuario( control: FormControl) : Promise<ErrorValidate> | Observable<ErrorValidate> {
    if ( !control.value ){
      return Promise.resolve(null);
    }
    return new Promise( (resolve , reject) => {
        setTimeout(() => {
          if( control.value === 'respejo' ) {
            resolve({ existe: true }); 
          }else{
            resolve( null);
          } 
        }, 2000);
    });
  }

  noEspejo( control: FormControl) : ErrorValidate  {
      if( control.value?.toLowerCase() === 'espejo' ){
        return{
          noEspejo : true
        }
      }
      return null;
  }

  clavesIguales( pass1 : string , pass2: string ){

    return ( formGroup: FormGroup ) => {
        const pass1Control = formGroup.controls[pass1];
        const pass2Control = formGroup.controls[pass2];

        if( pass1Control.value === pass2Control.value  ){
          pass2Control.setErrors(null);
        }else{
          pass2Control.setErrors({ notEqual: true });
        }

    }
  }



}
