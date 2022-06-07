export interface Usuarios {
    id:number;
    rol:string;
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    email:string;
    clave:string;    
    especialidad?:string;
    obraSocial?:string;
    fotos:string;
    estado:boolean;
    habilitado?:boolean
}
