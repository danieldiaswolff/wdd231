const CHAVE_FILTRO = "trilhasJoinvilleFiltro";
const CHAVE_VISITAS = "trilhasJoinvilleVisitas";

export function salvarFiltro(dificuldade) {
  localStorage.setItem(CHAVE_FILTRO, dificuldade);
}

export function lerFiltro() {
  return localStorage.getItem(CHAVE_FILTRO) || "todas";
}

export function registrarVisita() {
  const atual = Number(localStorage.getItem(CHAVE_VISITAS) || "0");
  const novo = atual + 1;
  localStorage.setItem(CHAVE_VISITAS, String(novo));
  return novo;
}

export function lerVisitas() {
  return Number(localStorage.getItem(CHAVE_VISITAS) || "0");
}
