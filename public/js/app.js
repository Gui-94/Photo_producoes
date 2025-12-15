async function carregarConteudo() {
  try {
    const res = await fetch("/api/content")

    if (!res.ok) {
      throw new Error("Erro ao carregar conteúdo")
    }

    const data = await res.json()

    // HERO
    document.getElementById("heroTitle").textContent =
      data.heroTitle || "Capturando Momentos, Criando Histórias"

    document.getElementById("heroDesc").textContent =
      data.heroDesc || "Ensaios profissionais com qualidade premium."

    // SOBRE
    document.getElementById("sobreText").textContent =
      data.sobre ||
      "Somos apaixonados por registrar emoções reais com um toque artístico e elegante."

    // IMAGENS DO PORTFÓLIO
    for (let i = 1; i <= 4; i++) {
      const imgElement = document.getElementById("img" + i)

      imgElement.src =
        data["img" + i] ||
        "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=1200&auto=format&fit=crop"
    }
  } catch (err) {
    console.error("Erro no app.js:", err)
  }
}

// inicia quando a página carregar
document.addEventListener("DOMContentLoaded", carregarConteudo)
