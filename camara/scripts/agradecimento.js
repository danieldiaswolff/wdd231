const parametros = new URLSearchParams(window.location.search);

const campos = [
  ["nome", "exibe-nome"],
  ["sobrenome", "exibe-sobrenome"],
  ["email", "exibe-email"],
  ["celular", "exibe-celular"],
  ["organizacao", "exibe-organizacao"],
  ["timestamp", "exibe-timestamp"],
];

campos.forEach(([parametro, idElemento]) => {
  const elemento = document.getElementById(idElemento);
  if (!elemento) {
    return;
  }

  const valor = parametros.get(parametro);
  elemento.textContent = valor && valor.trim() !== "" ? valor : "Não informado";
});
