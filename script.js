/* ================= FECHA OBJETIVO ================= */
const target = new Date(2026, 1, 14, 21, 0, 0);

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const countdown = document.getElementById("countdown");
  if (!countdown) return;

  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    countdown.innerHTML =
      "<p style='text-align:center;font-weight:600;'>¡Hoy celebramos! 🎉✨</p>";
    return;
  }

  const t = Math.floor(diff / 1000);

  document.getElementById("d").textContent = pad(Math.floor(t / 86400));
  document.getElementById("h").textContent = pad(Math.floor((t % 86400) / 3600));
  document.getElementById("m").textContent = pad(Math.floor((t % 3600) / 60));
  document.getElementById("s").textContent = pad(t % 60);
}

setInterval(tick, 1000);
tick();

/* ================= GLOBOS ================= */
const bg = document.getElementById("balloons-bg");
const BALLOONS = 25;

function createBalloons() {
  if (!bg) return;

  bg.innerHTML = "";

  const isMobile = window.innerWidth <= 600;

  for (let i = 0; i < BALLOONS; i++) {
    const b = document.createElement("div");
    b.className = "balloon";

    const size = isMobile
      ? 25 + Math.random() * 25
      : 40 + Math.random() * 40;

    const duration = 20 + Math.random() * 10;
    const delay = Math.random() * 20;

    b.style.width = size + "px";
    b.style.height = size * 1.3 + "px";
    b.style.animationDuration = duration + "s";
    b.style.animationDelay = "-" + delay + "s";

    if (isMobile) {
      // 🔥 SOLO LADOS (nunca centro)
      if (Math.random() < 0.5) {
        // LADO IZQUIERDO (0% - 10%)
        b.style.left = Math.random() * 10 + "vw";
      } else {
        // LADO DERECHO (90% - 100%)
        b.style.left = 90 + Math.random() * 10 + "vw";
      }
    } else {
      // Desktop normal
      b.style.left = Math.random() * 100 + "vw";
    }

    bg.appendChild(b);
  }
}

createBalloons();
window.addEventListener("resize", createBalloons);


/* ================= MÚSICA ================= */
const envelope = document.getElementById("envelope");
const invitation = document.getElementById("invitation-wrapper");
const music = document.getElementById("bg-music");
const btnMusic = document.getElementById("music-btn");

let playing = false;

if (btnMusic && music) {
  btnMusic.addEventListener("click", async () => {
    try {
      if (!playing) {
        await music.play();
        music.volume = 0.35;
        btnMusic.textContent = "🔇 Pausar música";
      } else {
        music.pause();
        btnMusic.textContent = "🔊 Activar música";
      }
      playing = !playing;
    } catch {
      console.log("Autoplay bloqueado");
    }
  });
}

if (envelope && invitation) {
  envelope.addEventListener("click", async () => {
    envelope.classList.add("open");

    try {
      await music.play();
      music.volume = 0.35;
      playing = true;
      if (btnMusic) btnMusic.textContent = "🔇 Pausar música";
    } catch {}

    setTimeout(() => {
      envelope.style.display = "none";
      invitation.classList.remove("hidden");
    }, 800);
  });
}

/* ================= CONFIRMACIÓN DEFINITIVA ================= */

const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbxZJnaM2kyKEgexqHB3yjG8B7ZBhAmHPIajqFUfexJQv3_FYtcLeQ_DmO1EQTvBJ96Izw/exec";

const nombreInput = document.getElementById("nombre");
const btnConfirmar = document.getElementById("confirmar");
const msg = document.getElementById("msg");

// ID único por dispositivo
let invitacionId = localStorage.getItem("invitacion_id");

if (!invitacionId) {
  invitacionId = crypto.randomUUID();
  localStorage.setItem("invitacion_id", invitacionId);
}

// Si ya confirmó
if (localStorage.getItem("confirmado")) {
  btnConfirmar.disabled = true;
  btnConfirmar.textContent = "✔ Asistencia confirmada";
  msg.textContent = "🎉 Ya confirmaste tu asistencia";
}

btnConfirmar.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();

  if (!nombre) {
    msg.textContent = "Escribe tu nombre ✍️";
    return;
  }

  msg.textContent = "Enviando confirmación...";

  fetch(WEBAPP_URL, {
    method: "POST",
    mode: "no-cors", // 👈 IMPORTANTE
    body: new URLSearchParams({
      id: invitacionId,
      nombre: nombre
    })
  });

  // No esperamos respuesta (porque CORS la bloquea)

  localStorage.setItem("confirmado", "true");

  btnConfirmar.disabled = true;
  btnConfirmar.textContent = "✔ Asistencia confirmada";
  msg.textContent = "🎉 ¡Gracias por confirmar!";
});
