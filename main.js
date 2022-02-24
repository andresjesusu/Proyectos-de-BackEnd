class Usuario {
    constructor(nombre, apellido, libros, mascotas){
    this.nombre = nombre
    this.apellido = apellido
    this.libros = [libros, libros]
    this.mascotas = [mascotas]
}

getFullName(){ 
    return console.log("Soy :" + nombre + " " + apellido)
}

addMascota(){
    return console.log("Mi mascota se llama " + [mascotas]);

}

countMascotas() {
    console.log("Tengo "+ this.mascotas.length + " mascota")
}

addBook() {
    return console.log(["Mi libro favorito es "+libro + " "+ "y su autor es: "+autor])

}

getBookNames() {
    console.log([libro])
}



}

let nombre = prompt("¿Cual es Tu nombre?");
let apellido = prompt("¿Cual es tu apellido?");
let mascotas = prompt("Como se llama tu mascota?");
let libro = prompt("Dime el nombre de tu libro favorito?");
let autor = prompt("Dime el autor de tu libro favorito?");


const usuario1 = new Usuario();

usuario1.getFullName()
usuario1.addMascota()
usuario1.countMascotas()
usuario1.addBook()
usuario1.getBookNames()


