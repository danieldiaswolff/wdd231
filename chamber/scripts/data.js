const anoAtual = document.getElementById("anoAtual");
const ultimaModificacao = document.getElementById("ultimaModificacao");

if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

if (ultimaModificacao) {
  ultimaModificacao.textContent = `Última Modificação: ${document.lastModified}`;
}
