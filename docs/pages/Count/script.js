const boxDesplegable = document.querySelector(".deplegable-items__cuenta");
const navDesplegable = document.querySelector(".seleccionar-item__cuenta")



addEventListener("click", (e) => {

    if (e.target.type == "button" || e.target.parentElement.type == "button") navDesplegable.classList.toggle("deplegable--ocultar__cuenta")

    else navDesplegable.classList.add("deplegable--ocultar__cuenta")

})
