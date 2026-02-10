const target = new Date(2026, 1, 14, 20, 0, 0);


function pad(n){ return String(n).padStart(2,"0"); }

function tick(){
  const now = new Date();
  let diff = target - now;

  if(diff < 0){
    document.getElementById("countdown").innerHTML =
      "<p style='text-align:center;font-weight:600;'>¡Hoy celebramos! 🎉✨</p>";
    return;
  }

  const t = Math.floor(diff/1000);
  document.getElementById("d").textContent = pad(Math.floor(t/86400));
  document.getElementById("h").textContent = pad(Math.floor(t%86400/3600));
  document.getElementById("m").textContent = pad(Math.floor(t%3600/60));
  document.getElementById("s").textContent = pad(t%60);
}

setInterval(tick,1000);
tick();

/* Slider */
const memories=document.querySelectorAll(".memory");
let i=0;
setInterval(()=>{
  memories[i].classList.remove("active");
  i=(i+1)%memories.length;
  memories[i].classList.add("active");
},3000);

/* Música */
const music=document.getElementById("bg-music");
const btn=document.getElementById("music-btn");
let play=false;

btn.onclick=async()=>{
  if(!play){
    await music.play();
    btn.textContent="🔇 Pausar música";
  }else{
    music.pause();
    btn.textContent="🔊 Activar música";
  }
  play=!play;
};
/* ===== GLOBOS DORADOS FLOTANDO ===== */
const bg = document.getElementById("balloons-bg");
const BALLOONS = 18;

for(let i=0;i<BALLOONS;i++){
  const b = document.createElement("div");
  b.className = "balloon";

  const size = 40 + Math.random() * 50;
  const duration = 18 + Math.random() * 15;
  const delay = Math.random() * 20;

  b.style.width = size + "px";
  b.style.height = size * 1.3 + "px";
  b.style.left = Math.random() * 100 + "vw";
  b.style.animationDuration = duration + "s";
  b.style.animationDelay = "-" + delay + "s";

  bg.appendChild(b);
}
/* ===== APERTURA DE CARTA ===== */
const envelope = document.getElementById("envelope");
const invitation = document.getElementById("invitation-wrapper");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");

  setTimeout(() => {
    envelope.style.display = "none";
    invitation.classList.remove("hidden");
  }, 800);
});
