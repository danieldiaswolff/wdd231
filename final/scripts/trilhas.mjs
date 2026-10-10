import "./navegacao.mjs";
import { buscarTrilhas, filtrarPorDificuldade } from "./data.mjs";
import { criarModal } from "./modal.mjs";
import { lerFiltro, salvarFiltro } from "./preferencias.mjs";

const grade = document.querySelector("#lista-trilhas");
const filtro = document.querySelector("#filtro-dificuldade");
const contador = document.querySelector("#contador-trilhas");
const modal = criarModal();
let trilhas = [];

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
      <h2>${trilha.nome}</h2>
      <p class="meta">${trilha.dificuldade} · ${trilha.distanciaKm} km</p>
      <p class="meta">${trilha.duracao} · ${trilha.local}</p>
      <p>${trilha.descricao}</p>
      <button type="button" data-id="${trilha.id}">Mais detalhes</button>
    </article>
  `;
}

function renderizar(lista) {
  if (!grade) return;

  grade.innerHTML = lista.map(cartaoTrilha).join("");

  if (contador) {
    contador.textContent = `${lista.length} trilha${lista.length === 1 ? "" : "s"} encontrada${lista.length === 1 ? "" : "s"}`;
  }

  grade.querySelectorAll("button[data-id]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = Number(botao.dataset.id);
      const trilha = trilhas.find((item) => item.id === id);
      if (trilha) modal.abrir(trilha);
    });
  });
}

function aplicarFiltro() {
  const dificuldade = filtro?.value || "todas";
  salvarFiltro(dificuldade);
  const filtradas = filtrarPorDificuldade(trilhas, dificuldade);
  renderizar(filtradas);
}

async function iniciar() {
  if (!grade) return;

  try {
    trilhas = await buscarTrilhas();

    if (filtro) {
      filtro.value = lerFiltro();
      filtro.addEventListener("change", aplicarFiltro);
    }

    aplicarFiltro();
  } catch {
    grade.innerHTML =
      '<p class="erro" role="alert">Não foi possível carregar as trilhas. Verifique sua conexão e tente de novo.</p>';
  }
}

iniciar();
