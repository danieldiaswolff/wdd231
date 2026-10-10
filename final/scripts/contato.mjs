import "./navegacao.mjs";

const formulario = document.querySelector("#formulario-contato");

if (formulario) {
  formulario.addEventListener("submit", () => {
    const dados = new FormData(formulario);
    const preferencia = dados.get("dificuldade") || "qualquer";
    localStorage.setItem("trilhasJoinvilleUltimoContato", preferencia);
  });
}
