export function criarModal() {
  let dialog = document.querySelector("#modal-trilha");

  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "modal-trilha";
    dialog.setAttribute("aria-labelledby", "modal-titulo");
    dialog.innerHTML = `
      <article>
        <h2 id="modal-titulo"></h2>
        <img id="modal-imagem" src="" alt="" width="640" height="427" loading="lazy">
        <p id="modal-meta" class="meta"></p>
        <p id="modal-descricao"></p>
        <button type="button" id="modal-fechar">Fechar</button>
      </article>
    `;
    document.body.appendChild(dialog);

    dialog.querySelector("#modal-fechar").addEventListener("click", () => {
      dialog.close();
    });

    dialog.addEventListener("click", (evento) => {
      if (evento.target === dialog) {
        dialog.close();
      }
    });
  }

  return {
    abrir(trilha) {
      dialog.querySelector("#modal-titulo").textContent = trilha.nome;
      const imagem = dialog.querySelector("#modal-imagem");
      imagem.src = trilha.imagem;
      imagem.alt = `Foto da trilha ${trilha.nome}`;
      dialog.querySelector("#modal-meta").textContent =
        `${trilha.dificuldade} · ${trilha.distanciaKm} km · ${trilha.duracao} · ${trilha.local}`;
      dialog.querySelector("#modal-descricao").textContent = trilha.descricao;
      dialog.showModal();
    },
  };
}
