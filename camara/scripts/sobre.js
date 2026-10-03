import { interesses } from "../data/interesses.mjs";

const grade = document.getElementById("grade-interesses");
const mensagemVisita = document.getElementById("mensagem-visita");
const botaoFecharVisita = document.getElementById("fechar-visita");
const CHAVE_VISITA = "camara-sobre-ultima-visita";

function criarCartao(item) {
  const artigo = document.createElement("article");
  artigo.className = `cartao-interesse interesse-${item.area}`;
  artigo.innerHTML = `
    <h2>${item.nome}</h2>
    <figure>
      <img src="${item.imagem}" alt="${item.alt}" width="300" height="200" loading="lazy">
    </figure>
    <address>${item.endereco}</address>
    <p>${item.descricao}</p>
    <button type="button" data-url="${item.url}">Saiba mais</button>
  `;
  return artigo;
}

function exibirInteresses() {
  if (!grade) {
    return;
  }

  const fragmento = document.createDocumentFragment();
  interesses.forEach((item) => {
    fragmento.appendChild(criarCartao(item));
  });
  grade.appendChild(fragmento);

  grade.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-url]");
    if (!botao) {
      return;
    }
    window.open(botao.dataset.url, "_blank", "noopener,noreferrer");
  });
}

function montarMensagemVisita() {
  if (!mensagemVisita) {
    return;
  }

  const agora = Date.now();
  const anterior = localStorage.getItem(CHAVE_VISITA);
  let texto;

  if (!anterior) {
    texto = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
  } else {
    const milissegundosPorDia = 1000 * 60 * 60 * 24;
    const dias = Math.floor((agora - Number(anterior)) / milissegundosPorDia);

    if (dias < 1) {
      texto = "Já voltou? Que legal!";
    } else if (dias === 1) {
      texto = "Seu último acesso foi há 1 dia.";
    } else {
      texto = `Seu último acesso foi há ${dias} dias.`;
    }
  }

  mensagemVisita.querySelector("p").textContent = texto;
  mensagemVisita.hidden = false;
  localStorage.setItem(CHAVE_VISITA, String(agora));
}

if (botaoFecharVisita) {
  botaoFecharVisita.addEventListener("click", () => {
    mensagemVisita.hidden = true;
  });
}

exibirInteresses();
montarMensagemVisita();
