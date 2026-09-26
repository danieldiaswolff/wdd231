const anoAtual = document.getElementById("anoAtual");
const ultimaModificacao = document.getElementById("ultimaModificacao");
const fontesGoogle = document.getElementById("fontes-google");

if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

if (ultimaModificacao) {
  ultimaModificacao.textContent = `Última Modificação: ${document.lastModified}`;
}

if (fontesGoogle) {
  const ativarFontesGoogle = () => {
    fontesGoogle.media = "all";
  };

  fontesGoogle.addEventListener("load", ativarFontesGoogle);

  if (fontesGoogle.sheet) {
    ativarFontesGoogle();
  }
}
