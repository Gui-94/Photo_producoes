// Alternar telas
const loginBox = document.getElementById("loginBox");
const createBox = document.getElementById("createBox");

document.getElementById("goCreate").onclick = () => {
  loginBox.classList.add("hidden");
  createBox.classList.remove("hidden");
  msg("");
};

document.getElementById("goLogin").onclick = () => {
  createBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
  msg("");
};

// Criar conta
document.getElementById("createBtn").onclick = () => {
  const u = document.getElementById("newUser").value.trim();
  const p = document.getElementById("newPass").value.trim();

  if (!u || !p) return msg("Preencha usuário e senha.", true);

  localStorage.setItem("adm_user", u);
  localStorage.setItem("adm_pass", p);

  msg("Conta criada com sucesso! Agora faça login.", false);

  document.getElementById("newUser").value = "";
  document.getElementById("newPass").value = "";

  // volta para login automaticamente
  setTimeout(() => {
    createBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
  }, 1200);
};

// Login
document.getElementById("loginBtn").onclick = () => {
  const u = document.getElementById("user").value.trim();
  const p = document.getElementById("pass").value.trim();

  const savedUser = localStorage.getItem("adm_user");
  const savedPass = localStorage.getItem("adm_pass");

  if (u === savedUser && p === savedPass) {
    localStorage.setItem("auth", "ok");
    window.location.href = "admin.html";
  } else {
    msg("Usuário ou senha incorretos.", true);
  }
};

// Mensagens
function msg(text, error = true) {
  const m = document.getElementById("msg");
  m.style.color = error ? "red" : "lightgreen";
  m.textContent = text;
}
