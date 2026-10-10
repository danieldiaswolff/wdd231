const URL_TRILHAS = new URL("../data/trilhas.json", import.meta.url);

export async function buscarTrilhas() {
  try {
    const resposta = await fetch(URL_TRILHAS);
    if (!resposta.ok) {
      throw new Error(`Falha ao carregar trilhas (${resposta.status})`);
    }
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao buscar trilhas:", erro);
    throw erro;
  }
}

export function filtrarPorDificuldade(trilhas, dificuldade) {
  if (!dificuldade || dificuldade === "todas") {
    return trilhas;
  }
  return trilhas.filter(
    (trilha) => trilha.dificuldade.toLowerCase() === dificuldade.toLowerCase()
  );
}

export function obterDestaques(trilhas, limite = 3) {
  return trilhas.filter((trilha) => trilha.destaque).slice(0, limite);
}
