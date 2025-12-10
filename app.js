// HERO
document.getElementById("heroTitle").textContent =
  localStorage.getItem("heroTitle") || "Capturando Momentos, Criando Histórias";

document.getElementById("heroDesc").textContent =
  localStorage.getItem("heroDesc") || "Ensaios profissionais com qualidade premium.";

// SOBRE
document.getElementById("sobreText").textContent =
  localStorage.getItem("sobre") ||
  "Somos apaixonados por registrar emoções reais com um toque artístico e elegante.";

// IMAGENS DO PORTFÓLIO
const defaultImgs = [
  "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542037104857-ffbb0b915d0b?q=80&w=1200&auto=format&fit=crop"
];

for (let i = 1; i <= 4; i++) {
  const imgElement = document.getElementById("img" + i);
  const savedImg = localStorage.getItem("img" + i);

  imgElement.src = savedImg || defaultImgs[i - 1];
}
