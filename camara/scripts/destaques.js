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

function criarDado(rotulo, conteudo) {
  const linha = document.createElement("p");
  const etiqueta = document.createElement("strong");
  etiqueta.textContent = `${rotulo}: `;
  linha.appendChild(etiqueta);
  linha.append(conteudo);
  return linha;
}

function criarCartaoDestaque(membro) {
  const artigo = document.createElement("article");
  const nome = document.createElement("h3");
  const slogan = document.createElement("p");
  const corpo = document.createElement("div");
  const dados = document.createElement("div");
  const imagem = document.createElement("img");
  const link = document.createElement("a");
  const nivel = document.createElement("span");

  artigo.className = "cartao-destaque";
  slogan.className = "destaque-slogan";
  corpo.className = "destaque-corpo";
  dados.className = "destaque-dados";

  nome.textContent = membro.nome;
  slogan.textContent = membro.setor;

  link.href = membro.url;
  link.textContent = membro.url.replace(/^https?:\/\//, "");
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  nivel.className = `nivel nivel-${membro.nivelAssociacao}`;
  nivel.textContent = niveis[membro.nivelAssociacao] || "Membro";

  imagem.src = `imagens/${membro.imagem}`;
  imagem.alt = `Logotipo de ${membro.nome}`;
  imagem.width = 96;
  imagem.height = 96;
  imagem.loading = "lazy";

  dados.appendChild(criarDado("Telefone", membro.telefone));
  dados.appendChild(criarDado("Endereço", membro.endereco));
  dados.appendChild(criarDado("Site", link));
  dados.appendChild(nivel);

  corpo.appendChild(imagem);
  corpo.appendChild(dados);

  artigo.appendChild(nome);
  artigo.appendChild(slogan);
  artigo.appendChild(corpo);

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
