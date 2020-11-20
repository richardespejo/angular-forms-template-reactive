import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  formReactive: FormGroup;

  constructor(  private formBuild : FormBuilder ,
                //se crea un servicio para personalizar cuertas validaciones asincronas que van en el  form build group
                private _validatorService : ValidatorsService ) {
    this.crearFomulario();
    this.cargarDatosFormulario();
    this.listener();

  }

  ngOnInit(): void {
  }

  //implementacion get de los inputs del formulario

  get nombre() {
    return this.formReactive.get('nombre').invalid && this.formReactive.get('nombre').touched;
  }
  get apellido() {
    return this.formReactive.get('apellido').invalid && this.formReactive.get('apellido').touched;
  }
  get correo() {
    return this.formReactive.get('correo').invalid && this.formReactive.get('correo').touched;
  }
  get usuario() {
    return this.formReactive.get('usuario').invalid && this.formReactive.get('usuario').touched;
  }
  get distrito() {
    return this.formReactive.get('direccion.distrito').invalid && this.formReactive.get('direccion.distrito').touched;
  }
  get ciudad() {
    return this.formReactive.get('direccion.ciudad').invalid && this.formReactive.get('direccion.ciudad').touched;
  }
  get pasatiempos() {
    return this.formReactive.get('pasatiempos') as FormArray;
  }
  get clave1() {
    return this.formReactive.get('clave1').invalid && this.formReactive.get('direccion.ciudad').touched;
  }
  get clave2() {
    const clave1 = this.formReactive.get('clave1').value;
    const clave2 = this.formReactive.get('clave2').value;
    return (clave1 === clave2) ? false : true;
  }

  //creacion del formulario reactivo
  crearFomulario(){
    this.formReactive = this.formBuild.group({
      nombre  : ['' , [Validators.required , Validators.minLength(5)] ],
      apellido: ['' , [Validators.required , this._validatorService.noEspejo ] ],
      correo  : ['' , [Validators.required , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      //en el input usuario se ejecuta una accion asincrona que busca validar si existe el usuario
      usuario : ['' , , this._validatorService.existeUsuario ],
      clave1  : ['' , Validators.required],
      clave2  : ['' , Validators.required],
      //manejo de un objeto anidado dentro del from group, se decalra en el row del fromGroupNam=direccion
      direccion: this.formBuild.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.formBuild.array([]) 

    },{
      validators: this._validatorService.clavesIguales('clave1','clave2')
    });
  }

  //cargamos data al formulario OJO ESTO DEBERIA VERNIR DE UN SERVICIO
  cargarDatosFormulario(){
    this.formReactive.setValue({
      nombre: 'Richard',
      apellido: 'Espejo',
      correo: 'richardespejo@hotmail.es',
      usuario: '',
      clave1: '',
      clave2: '',
      direccion: {
        distrito: 'Madrid',
        ciudad: 'Aranjuez'
      },
      pasatiempos: []
    });
  }

  //agregar pasatiempo
  agregarPasatiempo(){
    this.pasatiempos.push( this.formBuild.control( '' , Validators.required  ) );
  }

  //borrasrpasatiempo
  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);    
  }

  //proceso de formulario
  guardar(){
    console.log(this.formReactive);
    if( this.formReactive.invalid){
       return Object.values( this.formReactive.controls ).forEach( controlPrincipal =>{

        if( controlPrincipal instanceof FormGroup ){
          Object.values( controlPrincipal.controls).forEach( controlDireccion => controlPrincipal.markAllAsTouched() );
        }else{
          controlPrincipal.markAllAsTouched();
        }

       });
    }
    //reseteo del formulario una vez procesada la data
    this.formReactive.reset();
  }

  listener(){
      //para ver si todos los valores del formulario han cmabiado
      this.formReactive.valueChanges.subscribe( value => {
        console.log(value);
      });
      // para ver el status del formulario
      this.formReactive.statusChanges.subscribe( status => {
        console.log(status);
      });
      //para ver especificamente el cambio en un input
      this.formReactive.get('nombre').valueChanges.subscribe( console.log );
  }




}
