// =====================================
// CUENTA ATRÁS BODA
// Sandra & Laura
// =====================================

const weddingDate = new Date("2027-09-25T17:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);


// =====================================
// FORMULARIO DE CONFIRMACIÓN
// Sandra & Laura
// =====================================

const formulario = document.getElementById("formulario-boda");

if (formulario) {

    formulario.addEventListener("submit", async function (event) {

        event.preventDefault();

        const boton = formulario.querySelector(".btn");

        boton.disabled = true;
        boton.textContent = "ENVIANDO...";

        const formData = new FormData(formulario);

        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (data.success) {

                formulario.innerHTML = `
                    <div class="mensaje-confirmacion">

                        <div class="mensaje-icono">❦</div>

                        <h3>¡Gracias por confirmar!</h3>

                        <p>
                            Nos hace muchísima ilusión compartir
                            este día contigo.
                        </p>

                        <p class="mensaje-firmas">
                            Sandra & Laura
                        </p>

                    </div>
                `;

            } else {

                boton.disabled = false;
                boton.textContent = "CONFIRMAR ASISTENCIA";

                alert(
                    "No hemos podido enviar la confirmación. " +
                    "Por favor, inténtalo de nuevo."
                );
            }

        } catch (error) {

            boton.disabled = false;
            boton.textContent = "CONFIRMAR ASISTENCIA";

            alert(
                "Ha ocurrido un error al enviar la confirmación. " +
                "Por favor, inténtalo de nuevo."
            );
        }

    });

}

// =====================================
// MÚSICA DE LA BODA
// Sandra & Laura
// =====================================

const botonMusica = document.getElementById("boton-musica");
const musicaBoda = document.getElementById("musica-boda");

if (botonMusica && musicaBoda) {

    botonMusica.addEventListener("click", function () {

        if (musicaBoda.paused) {

            musicaBoda.play();

            botonMusica.classList.add("reproduciendo");

            botonMusica.querySelector(".icono-musica").textContent = "Ⅱ";
            botonMusica.querySelector(".texto-musica").textContent = "Pausar música";

        } else {

            musicaBoda.pause();

            botonMusica.classList.remove("reproduciendo");

            botonMusica.querySelector(".icono-musica").textContent = "♪";
            botonMusica.querySelector(".texto-musica").textContent = "Nuestra canción";
        }

    });

    musicaBoda.addEventListener("ended", function () {

        botonMusica.classList.remove("reproduciendo");

        botonMusica.querySelector(".icono-musica").textContent = "♪";
        botonMusica.querySelector(".texto-musica").textContent = "Nuestra canción";

    });

}