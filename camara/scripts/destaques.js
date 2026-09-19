const listaDestaques = document.getElementById("destaques");

const niveis = {
  1: "Membro",
  2: "Prata",
  3: "Ouro",
};

function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function criarCartaoDestaque(membro) {
  const artigo = document.createElement("article");
  const nome = document.createElement("h3");
  const endereco = document.createElement("p");
  const telefone = document.createElement("p");
  const site = document.createElement("p");
  const nivel = document.createElement("span");
  const imagem = document.createElement("img");
  const link = document.createElement("a");

  artigo.className = "cartao-destaque";
  nome.textContent = membro.nome;
  endereco.textContent = membro.endereco;
  telefone.textContent = membro.telefone;

  link.href = membro.url;
  link.textContent = membro.url.replace(/^https?:\/\//, "");
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  site.appendChild(link);

  nivel.className = `nivel nivel-${membro.nivelAssociacao}`;
  nivel.textContent = niveis[membro.nivelAssociacao] || "Membro";

  imagem.src = `imagens/${membro.imagem}`;
  imagem.alt = `Logotipo de ${membro.nome}`;
  imagem.width = 560;
  imagem.height = 560;
  imagem.loading = "lazy";

  artigo.appendChild(imagem);
  artigo.appendChild(nome);
  artigo.appendChild(endereco);
  artigo.appendChild(telefone);
  artigo.appendChild(site);
  artigo.appendChild(nivel);

  return artigo;
}

function exibirDestaques(membros) {
  const elegiveis = membros.filter(
    (membro) => membro.nivelAssociacao === 2 || membro.nivelAssociacao === 3
  );
  const escolhidos = embaralhar(elegiveis).slice(0, 3);

  listaDestaques.replaceChildren();
  escolhidos.forEach((membro) => {
    listaDestaques.appendChild(criarCartaoDestaque(membro));
  });
}

async function obterDestaques() {
  try {
    const resposta = await fetch("dados/membros.json");
    if (!resposta.ok) {
      throw new Error(`Falha ao buscar membros: ${resposta.status}`);
    }
    const dados = await resposta.json();
    exibirDestaques(dados);
  } catch (erro) {
    console.error("Erro ao carregar os destaques:", erro);
    const aviso = document.createElement("p");
    aviso.className = "erro";
    aviso.textContent = "Não foi possível carregar as empresas em destaque.";
    listaDestaques.replaceChildren(aviso);
  }
}

obterDestaques();
