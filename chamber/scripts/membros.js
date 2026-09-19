const listaMembros = document.getElementById("membros");
const botaoGrade = document.getElementById("botao-grade");
const botaoLista = document.getElementById("botao-lista");

const niveis = {
  1: "Membro",
  2: "Prata",
  3: "Ouro",
};

function criarCartao(membro) {
  const artigo = document.createElement("article");
  const nome = document.createElement("h3");
  const endereco = document.createElement("p");
  const telefone = document.createElement("p");
  const site = document.createElement("p");
  const setor = document.createElement("p");
  const nivel = document.createElement("span");
  const imagem = document.createElement("img");
  const link = document.createElement("a");

  nome.className = "membro-nome";
  endereco.className = "membro-endereco";
  telefone.className = "membro-telefone";
  site.className = "membro-site";
  setor.className = "membro-setor";

  nome.textContent = membro.nome;
  endereco.textContent = membro.endereco;
  telefone.textContent = membro.telefone;
  setor.textContent = membro.setor;

  link.href = membro.url;
  link.textContent = membro.url.replace(/^https?:\/\//, "");
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  site.appendChild(link);

  nivel.className = `nivel nivel-${membro.nivelAssociacao}`;
  nivel.textContent = niveis[membro.nivelAssociacao] || "Membro";

  imagem.src = `imagens/${membro.imagem}`;
  imagem.alt = `Foto de ${membro.nome}`;
  imagem.width = 560;
  imagem.height = 560;
  imagem.loading = "lazy";

  artigo.appendChild(imagem);
  artigo.appendChild(nome);
  artigo.appendChild(endereco);
  artigo.appendChild(telefone);
  artigo.appendChild(site);
  artigo.appendChild(setor);
  artigo.appendChild(nivel);

  return artigo;
}

function exibirMembros(membros) {
  listaMembros.replaceChildren();
  membros.forEach((membro) => {
    listaMembros.appendChild(criarCartao(membro));
  });
}

function definirVisualizacao(modo) {
  listaMembros.classList.remove("grade", "lista");
  listaMembros.classList.add(modo);

  const gradeAtiva = modo === "grade";
  botaoGrade.classList.toggle("ativo", gradeAtiva);
  botaoLista.classList.toggle("ativo", !gradeAtiva);
  botaoGrade.setAttribute("aria-pressed", gradeAtiva);
  botaoLista.setAttribute("aria-pressed", !gradeAtiva);
}

async function obterMembros() {
  try {
    const resposta = await fetch("dados/membros.json");
    if (!resposta.ok) {
      throw new Error(`Falha ao buscar membros: ${resposta.status}`);
    }
    const dados = await resposta.json();
    exibirMembros(dados);
  } catch (erro) {
    console.error("Erro ao carregar o diretório:", erro);
    const aviso = document.createElement("p");
    aviso.className = "erro";
    aviso.textContent = "Não foi possível carregar os membros da câmara.";
    listaMembros.replaceChildren(aviso);
  }
}

botaoGrade.addEventListener("click", () => definirVisualizacao("grade"));
botaoLista.addEventListener("click", () => definirVisualizacao("lista"));

obterMembros();
