// Campos de texto
const heroTitle = document.getElementById("admHeroTitle");
const heroDesc = document.getElementById("admHeroDesc");
const sobreText = document.getElementById("admSobre");

// Inputs de upload
const fileInputs = [
  document.getElementById("fileImg1"),
  document.getElementById("fileImg2"),
  document.getElementById("fileImg3"),
  document.getElementById("fileImg4"),
];

const previews = [
  document.getElementById("previewImg1"),
  document.getElementById("previewImg2"),
  document.getElementById("previewImg3"),
  document.getElementById("previewImg4"),
];

// Carregar dados salvos
function loadAdmin() {
  heroTitle.value = localStorage.getItem("heroTitle") || "";
  heroDesc.value = localStorage.getItem("heroDesc") || "";
  sobreText.value = localStorage.getItem("sobre") || "";

  for (let i = 0; i < 4; i++) {
    const saved = localStorage.getItem("img" + (i + 1));
    if (saved) previews[i].src = saved;
  }
}
loadAdmin();


// Selecionar imagem → gerar preview
fileInputs.forEach((input, index) => {
  input.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      previews[index].src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});


// Salvar tudo
document.getElementById("saveBtn").addEventListener("click", () => {
 document.getElementById("backHomeBtn").addEventListener("click", () => {
  window.location.href = "index.html"; // redireciona pra home
});

  localStorage.setItem("heroTitle", heroTitle.value);
  localStorage.setItem("heroDesc", heroDesc.value);
  localStorage.setItem("sobre", sobreText.value);

  // Salvar imagens (se tiver preview)
  previews.forEach((img, i) => {
    if (img.src) {
      localStorage.setItem("img" + (i + 1), img.src);
    }
  });

  alert("Alterações salvas com sucesso!");
});
