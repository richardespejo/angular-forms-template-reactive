import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  paises : any[] = []; 

  usuario = {
    nombre : "",
    apellido : "",
    correo : "",
    pais:"",
    genero:""
  };

  constructor( private _Paises : CountriesService) { }

  ngOnInit(): void {
    //llamo al servicio paises que esta en el directorio services
    this._Paises.getCountries()
      .subscribe( paises => {
          this.paises = paises;
          //coloco una opcion de valor vacio en la primera posicion del arreglo
          this.paises.unshift({
            nombre : 'seleccione...',
            codigo:''
          })
      });
  }

  guardarDatos( formTemplate : NgForm ){
      //manipulacion de los controles del DOM para mostrar todos los mensajes de errores 
      if(formTemplate.invalid){
        //esto recorre cada input del formulario y editando el control como si fuese touched o tocado
        Object.values(formTemplate.controls).forEach(control => {
          control.markAllAsTouched();
        });
        return;
      }else{
        //cuando el formulirio este correcto se envia al servicio para procesar la data
        console.log("funciones para guardar");
        console.log(formTemplate.value);
      }

  }

}
