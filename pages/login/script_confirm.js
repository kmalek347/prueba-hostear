const botonConfirmar = document.getElementById("boton__confirmar");
const inputContrasena = document.getElementById("input__contrasena")
const error = document.querySelector(".error__form");

inputContrasena.addEventListener("input", (e) => {


    if (e.data != null || inputContrasena.value.trim() != '') {

        botonConfirmar.removeAttribute('disabled');
    }

    else { botonConfirmar.setAttribute('disabled', true); }
});



botonConfirmar.addEventListener("click", () => {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (inputContrasena.value.trim() === usuario.contrasena) {
        console.log("coinciden las contraseñas");
        window.location.href = "../../index.html"
    }
    else {
        error.innerHTML = "La contraseña es incorrecta. Vuelva a intentarlo de nuevo";
        error.style.display = "block"
        console.log("No coinciden")
    }

})