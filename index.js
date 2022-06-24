today = new Date();

fechaSeleccionada = today;

añoSeleccionado = fechaSeleccionada.getFullYear();
mesSeleccionado = fechaSeleccionada.getMonth();
diaSeleccionado = fechaSeleccionada.getDate();

function mostrarMes() {
    // Mostramos los container de calendario y agenda

    let calendario = document.querySelector("#container-calendario");
    calendario.classList.remove("hidden");

    // Capturamos los elementos del calendario del DOM
    let cabezaCalendario = document.querySelector("thead");
    cabezaCalendario.textContent = "";
    // Cabecero del calendario.
    let headFila = document.createElement("tr");
    let elementoHead0 = document.createElement("td");
    elementoHead0.classList.add("pointer");
    elementoHead0.innerHTML = "<i class='bi bi-caret-left-fill'></i>";
    elementoHead0.addEventListener("click", () => {
        mesSeleccionado -= 1
        actualizarMes();
    });

    let elementoHead1 = document.createElement("td");
    elementoHead1.colSpan = 4;
    elementoHead1.classList.add("capitalize");

    elementoHead1.textContent = fechaSeleccionada.toLocaleString('es-ES', {
        month: 'long',
        year: 'numeric'
    });

    let elementoHead2 = document.createElement("td");
    elementoHead2.classList.add("pointer");
    elementoHead2.innerHTML = "<i class='bi bi-caret-right-fill'></i>"
    elementoHead2.addEventListener("click", () => {
        mesSeleccionado += 1
        actualizarMes();
    });

    let elementoHead3 = document.createElement("td");

    let boton = document.createElement("input");
    boton.value = "Hoy";
    boton.type = "button";
    boton.id = "botonHoy";
    boton.addEventListener("click", () => {
        fechaSeleccionada = today;
        añoSeleccionado = fechaSeleccionada.getFullYear();
        mesSeleccionado = fechaSeleccionada.getMonth();
        diaSeleccionado = fechaSeleccionada.getDate();
        actualizarMes();

    });
    elementoHead3.appendChild(boton);

    headFila.append(elementoHead0, elementoHead1, elementoHead2, elementoHead3);
    cabezaCalendario.append(headFila);
    actualizarMes();
}

function actualizarMes() {
    // Capturamos los elem entos del calendario del DOM
    let cuerpoCalendario = document.querySelector("tbody");
    let cabezaCalendario = document.querySelector("thead");
    let cabezaCalendarioTd = cabezaCalendario.querySelectorAll("td");

    // Creamos las constantes para el calendario
    const nombreDia = ["L", "M", "X", "J", "V", "S", "D"];

    let mostrarFecha = new Date(añoSeleccionado, mesSeleccionado, 1);

    let mostrarPrimerDia = new Date(añoSeleccionado, mesSeleccionado, 1).getDay();

    let mostrarUltimoDia = new Date(añoSeleccionado, mesSeleccionado + 1, 0).getDate();

    cuerpoCalendario.innerHTML = " ";
    cabezaCalendarioTd[1].textContent = mostrarFecha.toLocaleString('default', {
        month: 'long',
        year: 'numeric'
    });

    let celdaCalendario = 1;
    let diaMes = 1;

    for (index = 0; index < 6; index++) {
        let tr = document.createElement("tr");
        if (index == 0) {
            for (let i = 0; i <= 6; i++) {
                let td = document.createElement("td");
                td.textContent = nombreDia[i];
                tr.append(td);
            }
        } else {
            for (let celdaDia = 0; celdaDia < 7; celdaDia++) {
                let td = document.createElement("td");

                if (celdaCalendario >= mostrarPrimerDia && diaMes <= mostrarUltimoDia) {

                    td.textContent = "";
                    span = document.createElement("div");
                    span.classList.add("dia-calendario")
                    span.textContent = diaMes;

                    td.appendChild(span);
                    // Comprobamos si el dia es el actual
                    let diaDelCalendario = new Date(añoSeleccionado, mesSeleccionado, diaMes);

                    // sacame el dia de la semana
                    let opcionesLocaleString = {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    }
                    
                    let fechaSeleccionadaString = fechaSeleccionada.toLocaleDateString('es-ES', opcionesLocaleString);
                    let fechaCalendarioString = diaDelCalendario.toLocaleDateString('es-ES', opcionesLocaleString);

                    if (fechaCalendarioString == today.toLocaleDateString('es-ES', opcionesLocaleString)) {

                        span.classList.add("actual");
                        span.textContent = diaDelCalendario.getDate();

                    }

                    if (fechaCalendarioString == fechaSeleccionadaString) {

                        span.classList.add("seleccionado");
                    }

                    td.addEventListener("click", () => {
                        fechaSeleccionada = diaDelCalendario;
                        actualizarMes();

                    });

                    diaMes++;

                } else {
                    td.textContent = "";

                }

                tr.appendChild(td);
                celdaCalendario++;

            }
        }

        cuerpoCalendario.appendChild(tr);
    }
}

mostrarMes();