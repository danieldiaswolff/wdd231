const anoAtual = document.getElementById("anoAtual");
const ultimaModificacao = document.getElementById("ultimaModificacao");

anoAtual.textContent = new Date().getFullYear();
ultimaModificacao.textContent = document.lastModified;
