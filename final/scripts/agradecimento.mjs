import "./navegacao.mjs";

const parametros = new URLSearchParams(window.location.search);
const lista = document.querySelector("#dados-formulario");

const rotulos = {
  nome: "Nome",
  email: "E-mail",
  telefone: "Telefone",
  dificuldade: "Dificuldade preferida",
  mensagem: "Mensagem",
};

if (lista) {
  const entradas = [...parametros.entries()].filter(([chave]) => rotulos[chave]);

  if (entradas.length === 0) {
    lista.innerHTML =
      "<p>Nenhum dado de formulário foi encontrado. Volte à página de contato e envie novamente.</p>";
  } else {
    lista.innerHTML = entradas
      .map(
        ([chave, valor]) => `
          <div>
            <dt>${rotulos[chave]}</dt>
            <dd>${valor || "—"}</dd>
          </div>
        `
      )
      .join("");
  }
}
