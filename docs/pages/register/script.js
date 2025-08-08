const botonContinuar = document.getElementById("boton__continuar");
const botonRegistrar = document.getElementById("boton__registrar");

const seccionesForm = document.querySelectorAll(".secciones__form");
const volver = document.querySelector(".flecha");
const formulario = document.querySelector('.registro__form');

const seccionPersonales = document.querySelector('.datos_personales__form');

const inputsPersonales = document.querySelectorAll('.inputs__personales');
const inputsCuenta = document.querySelectorAll('.inputs__cuenta');
const inputsUbicacion = document.querySelectorAll('.inputs__ubicacion');
const inputNacimiento = document.getElementById('input__nacimiento');
const inputsRequeridos = Array.from(document.querySelectorAll('.inputs__requeridos'));

const seccionUbicacion = document.querySelector('.datos_ubicacion__form');

const requeridosPersonales = inputsRequeridos.filter(requerido => requerido.classList[0] == "inputs__personales")
const requeridosCuenta = inputsRequeridos.filter(requerido => requerido.classList[0] == "inputs__cuenta")
const requeridosUbicacion = inputsRequeridos.filter(requerido => requerido.classList[0] == "inputs__ubicacion")

const reglaCaracter = document.getElementById("regla-caracter__form")
const reglaMayuscula = document.getElementById("regla-mayuscula__form")
const reglaNumero = document.getElementById("regla-numero__form")
const reglaEspecial = document.getElementById("regla-especial__form")




const evuluarBoton = (seccion) => {
    switch (seccion) {
        case "inputs__personales":

            requeridosPersonales.forEach(input => {
                console.log("se itera un input", input)
                if (!input.value.trim()) {
                    console.log("este input no esta bien")
                    botonContinuar.setAttribute('disabled', true);

                }
                else botonContinuar.removeAttribute('disabled');
            })

            break



        case "inputs__cuenta":
            requeridosCuenta.forEach(input => {
                if (!input.value.trim()) {
                    botonContinuar.setAttribute('disabled', true);
                }
                else botonContinuar.removeAttribute('disabled');

            })

            break

        case "inputs__ubicacion":
            requeridosUbicacion.forEach(input => {
                if (!input.value.trim()) {
                    botonRegistrar.setAttribute('disabled', true);
                }
                else botonRegistrar.removeAttribute('disabled');
            })
            break


        default:
    }

}



addEventListener("input", (e) => {
    evuluarBoton(e.target.classList[0])

})



inputsCuenta[1].addEventListener("input", (e) => {

    let contraseña = inputsCuenta[1].value.trim();


    if (contraseña.length > 7) {

        reglaCaracter.classList.add("reglas_lista_valida__form");
        reglaCaracter.firstElementChild.classList.add("reglas_lista_valida__form");
    }

    else {
        reglaCaracter.classList.remove("reglas_lista_valida__form");
        reglaCaracter.firstElementChild.classList.remove("reglas_lista_valida__form");
    }


    if (/[A-Z]/.test(contraseña)) {
        reglaMayuscula.classList.add("reglas_lista_valida__form");
        reglaMayuscula.firstElementChild.classList.add("reglas_lista_valida__form");
    }

    else {
        reglaMayuscula.classList.remove("reglas_lista_valida__form");
        reglaMayuscula.firstElementChild.classList.remove("reglas_lista_valida__form");
    }



    if (/\d/.test(contraseña)) {
        reglaNumero.classList.add("reglas_lista_valida__form");
        reglaNumero.firstElementChild.classList.add("reglas_lista_valida__form");
    }

    else {
        reglaNumero.classList.remove("reglas_lista_valida__form");
        reglaNumero.firstElementChild.classList.remove("reglas_lista_valida__form");
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(contraseña)) {
        reglaEspecial.classList.add("reglas_lista_valida__form");
        reglaEspecial.firstElementChild.classList.add("reglas_lista_valida__form");

    }

    else {
        reglaEspecial.classList.remove("reglas_lista_valida__form");
        reglaEspecial.firstElementChild.classList.remove("reglas_lista_valida__form");
    }


})


const cambiarSeccion = (seccion, direccion) => {

    seccionCambiar = seccion;
    if (direccion) {
        if (seccionCambiar.nextElementSibling) {
            seccion.classList.toggle("datos_ocultar_reversa__form");
            seccionCambiar.nextElementSibling.classList.toggle("datos_ocultar__form")
            botonContinuar.setAttribute('disabled', true);
            // evuluarBoton(seccionCambiar.nextElementSibling);
        }
        return
    }

    if (seccionCambiar.previousElementSibling) {

        seccion.classList.toggle("datos_ocultar__form");
        seccionCambiar.previousElementSibling.classList.toggle("datos_ocultar_reversa__form")
        if (seccionCambiar == seccionesForm[2]) {
            botonContinuar.style.display = "block";
            botonRegistrar.style.display = "none"

        }
        evuluarBoton(seccionCambiar.previousElementSibling);
    }

    else window.location.href = "../login/index.html"
}


botonContinuar.addEventListener('click', (e) => {
    e.preventDefault();

    let erroresInputs = []

    seccionesForm.forEach(seccion => {
        if (seccion.classList.length < 3) seccionActual = seccion
    })

    switch (seccionActual.classList[0]) {
        case "datos_personales__form": {
            inputsPersonales.forEach(input => {
                if (!input.validity.tooShort && (input.type == "text" || input.type == "date" || input.type == "select-one") && input.validity.valid) {
                    input.nextElementSibling.style.display = "none"
                }
                else erroresInputs.push(input);
            })


            if (erroresInputs.length > 0) {
                erroresInputs.forEach(error => {
                    error.nextElementSibling.textContent = "Introduzca datos válidos";
                    error.nextElementSibling.style.display = "block"
                })
            }

            else cambiarSeccion(seccionActual, true);

            break
        }


        case "datos_cuenta__form": {
            inputsCuenta.forEach(input => {

                if (!input.validity.tooShort && (input.type == "text" || input.type == "password") && input.validity.valid) {
                    input.nextElementSibling.style.display = "none"

                    if (input == inputsCuenta[1]) {

                        if (input.value.length > 7 && /[A-Z]/.test(input.value) && /\d/.test(input.value) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input.value)) {
                            if (inputsCuenta[2].value !== input.value) {
                                erroresInputs.push([input, "Las contraseñas no coinciden"]);
                            }
                        }
                        else erroresInputs.push([input, "Introduzca una contraseña válida"]);
                    }
                }

                else erroresInputs.push([input, "Introduzca datos válidos"]);

            })

            if (erroresInputs.length > 0) {
                erroresInputs.forEach(error => {
                    error[0].nextElementSibling.textContent = `${error[1]}`;
                    error[0].nextElementSibling.style.display = "block"
                })
            }

            else {
                cambiarSeccion(seccionActual, true);
                botonContinuar.style.display = "none";
                botonRegistrar.style.display = "block"
            }

            break
        }


        case "datos_ubicacion__form": {
            inputsUbicacion.forEach(input => {
                if (!input.validity.tooShort && (input.type == "text" || input.type == "select-one") && input.validity.valid) {
                    input.nextElementSibling.style.display = "none"
                }

                else erroresInputs.push(input);
            })

            if (inputsUbicacion[0].value == "") {
                inputsUbicacion[0].nextElementSibling.textContent = "Introduzca una provincia";
                inputsUbicacion[0].nextElementSibling.style.display = "block"
            }


            if (erroresInputs.length > 0) {
                erroresInputs.forEach(error => {
                    error.nextElementSibling.textContent = "Introduzca datos válidos";
                    error.nextElementSibling.style.display = "block"
                })
            }

            break
        }

        default: console.log("es de otro")
    }
})



volver.addEventListener('click', (e) => {
    e.preventDefault();
    let seccionAtras

    seccionesForm.forEach(seccion => {
        if (seccion.classList.length < 3) {
            seccionAtras = seccion

        }
    })

    cambiarSeccion(seccionAtras, false)
})



formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = [{
        usuario: {
            nombre: `${e.target[0].value}`,
            apellido: `${e.target[1].value}`,
            dni: `${e.target[2].value}`,
            genero: `${e.target[3].value}`,
            nacimiento: `${e.target[4].value}`,
            numero: `${e.target[5].value}`,
            contraseña: `${e.target[6].value}`,
            provincia: `${e.target[8].value}`,
            ciudad: `${e.target[9].value}`
        }
    }]


    // let subirUsuario = "usuario"
    // for (let i = 0; i < 5; i++) {
    //     subirUsuario += i
    //     if (localStorage.getItem(subirUsuario)) continue
    //     else {
    //         localStorage.setItem(`usuario${i}`, JSON.stringify(datos[0]))
    //         break
    //     }
    // }
    window.location.href = "../../index.html"
})