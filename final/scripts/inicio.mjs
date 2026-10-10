import "./navegacao.mjs";
import { buscarTrilhas, obterDestaques } from "./data.mjs";
import { criarModal } from "./modal.mjs";
import { registrarVisita } from "./preferencias.mjs";

const grade = document.querySelector("#destaques");
const aviso = document.querySelector("#mensagem-visitas");
const modal = criarModal();
const visitas = registrarVisita();

if (aviso) {
  aviso.textContent =
    visitas === 1
      ? "Bem-vindo! Esta é a sua primeira visita neste navegador."
      : `Bem-vindo de volta! Você já visitou este site ${visitas} vezes neste navegador.`;
}

function cartaoTrilha(trilha) {
  return `
    <article class="cartao">
      <img
        src="${trilha.imagem}"
        alt="Foto da trilha ${trilha.nome}"
        width="480"
        height="320"
        loading="lazy"
      >
      <h3>${trilha.nome}</h3>
      <p class="meta">${trilha.dificuldade} · ${trilha.distanciaKm} km · ${trilha.duracao}</p>
      <p>${trilha.local}</p>
      <button type="button" data-id="${trilha.id}">Ver detalhes</button>
    </article>
  `;
}

async function iniciar() {
  if (!grade) return;

  try {
    const trilhas = await buscarTrilhas();
    const destaques = obterDestaques(trilhas, 3);
    grade.innerHTML = destaques.map(cartaoTrilha).join("");

    grade.querySelectorAll("button[data-id]").forEach((botao) => {
      botao.addEventListener("click", () => {
        const id = Number(botao.dataset.id);
        const trilha = trilhas.find((item) => item.id === id);
        if (trilha) modal.abrir(trilha);
      });
    });
  } catch {
    grade.innerHTML =
      '<p class="erro" role="alert">Não foi possível carregar os destaques. Tente novamente mais tarde.</p>';
  }
}

iniciar();
