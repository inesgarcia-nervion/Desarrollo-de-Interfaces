//Define identificadores únicos para cada dependencia que queremos 
//inyectar en nuestra aplicación.
//Garantiza que no haya colisiones entre nombres de dependencias.
//Permite cambiar fácilmente la implementación sin tocar el ViewModel ni la Vista.


const TYPES = {
    IRepositoryPersonas: Symbol.for("IRepositoryPersonas"),
    IndexVM: Symbol.for("IndexVM"),
};
export { TYPES };


//Symbol.for("IRepositoryPersonas") crea un símbolo global con ese nombre.
//Eso permite que el contenedor sepa exactamente a qué dependencia nos referimos, 
//aunque haya muchas interfaces o clases con nombres similares.