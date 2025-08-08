const botonContinuar = document.querySelector('.boton__continuar');

const inputEmail = document.getElementById('input__email');
const error = document.querySelector('.error__form')



const usuarios = [

    {
        usuario: {
            email: "shitcorreo10@gmail.com",
            contrasena: "1234"
        },


    },

    {
        usuario: {
            email: "sebasabrego78@gmail.com",
            contrasena: "1234"
        },

    }
]



botonContinuar.setAttribute('disabled', true)


inputEmail.addEventListener("input", (e) => {


    if (e.data != null || inputEmail.value.trim() != '') {

        botonContinuar.removeAttribute('disabled');
    }

    else { botonContinuar.setAttribute('disabled', true); }
});


const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

botonContinuar.addEventListener('click', (e) => {
    e.preventDefault();

    let emailRegex = regex.test(inputEmail.value.trim());

    if (emailRegex) {

        let validado = usuarios.findIndex((user) => user.usuario.email == inputEmail.value.trim());


        if (validado != -1) {

            let email = inputEmail.value.trim();

            localStorage.clear()
            localStorage.setItem("usuario", JSON.stringify(usuarios[validado].usuario))


            window.location.href = 'confirm.html';
        }

        else {
            error.textContent = 'No se ha encontrado la cuenta, pruebe ingresando los datos nuevamente.';
            error.style.display = 'block';
        }
    }

    else {

        error.textContent = 'Ingrese un correo electrónico válido'
        error.style.display = 'block';
    }
})



addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        botonContinuar.click();
    }
})





