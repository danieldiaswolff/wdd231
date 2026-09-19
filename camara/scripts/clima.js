const tempoAtual = document.querySelector("#tempo-atual");
const listaPrevisao = document.querySelector("#previsao");

const lat = -26.3;
const lon = -48.85;
const chaveApi = "6eacaab7d327035a021a89b922439df6";
const urlAtual = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${chaveApi}`;
const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${chaveApi}`;

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function titulo(texto) {
  return texto.split(" ").map(capitalizar).join(" ");
}

function dataIso(carimbo) {
  return new Date(carimbo * 1000).toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
}

function formatarHora(carimbo) {
  return new Date(carimbo * 1000).toLocaleTimeString("pt-BR", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
}

function rotuloPrevisao(carimbo) {
  const hoje = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });

  if (dataIso(carimbo) === hoje) {
    return "Hoje";
  }

  const rotulo = new Date(carimbo * 1000).toLocaleDateString("pt-BR", {
    weekday: "long",
    timeZone: "America/Sao_Paulo",
  });

  return rotulo.split("-").map(capitalizar).join("-");
}

function obterTresDias(lista) {
  const porDia = new Map();

  lista.forEach((item) => {
    const [dia, hora] = item.dt_txt.split(" ");
    const distancia = Math.abs(Number(hora.slice(0, 2)) - 12);
    const atual = porDia.get(dia);

    if (!atual || distancia < atual.distancia) {
      porDia.set(dia, { item, distancia });
    }
  });

  return Array.from(porDia.values())
    .map((valor) => valor.item)
    .slice(0, 3);
}

function extremosDoDia(lista, diaIso) {
  const temps = lista
    .filter((item) => item.dt_txt.startsWith(diaIso))
    .map((item) => item.main.temp);

  if (temps.length === 0) {
    return null;
  }

  return {
    max: Math.round(Math.max(...temps)),
    min: Math.round(Math.min(...temps)),
  };
}

function criarLinha(texto) {
  const linha = document.createElement("p");
  linha.textContent = texto;
  return linha;
}

function mostrarErro() {
  const aviso = document.createElement("p");
  aviso.className = "erro";
  aviso.textContent = "Não foi possível carregar o tempo de Joinville.";
  tempoAtual.replaceChildren(aviso);
  listaPrevisao.replaceChildren();
}

function mostrarResultados(atual, previsao) {
  const descricao = titulo(atual.weather[0].description);
  const icone = atual.weather[0].icon;
  const hojeIso = dataIso(atual.dt);
  const extremos = extremosDoDia(previsao.list, hojeIso);
  const maxima = extremos ? extremos.max : Math.round(atual.main.temp_max);
  const minima = extremos ? extremos.min : Math.round(atual.main.temp_min);

  const corpo = document.createElement("div");
  const imagem = document.createElement("img");
  const detalhes = document.createElement("div");
  const temperatura = document.createElement("p");
  const textoDescricao = document.createElement("p");

  corpo.className = "corpo-clima";
  detalhes.className = "detalhes-clima";
  temperatura.className = "temperatura-atual";
  textoDescricao.className = "descricao-clima";

  imagem.src = `https://openweathermap.org/img/wn/${icone}@2x.png`;
  imagem.alt = descricao;
  imagem.width = 80;
  imagem.height = 80;
  temperatura.textContent = `${Math.round(atual.main.temp)}°C`;
  textoDescricao.textContent = descricao;

  detalhes.appendChild(temperatura);
  detalhes.appendChild(textoDescricao);
  detalhes.appendChild(criarLinha(`Máxima: ${maxima}°C`));
  detalhes.appendChild(criarLinha(`Mínima: ${minima}°C`));
  detalhes.appendChild(criarLinha(`Umidade: ${atual.main.humidity}%`));
  detalhes.appendChild(criarLinha(`Nascer do Sol: ${formatarHora(atual.sys.sunrise)}`));
  detalhes.appendChild(criarLinha(`Pôr do Sol: ${formatarHora(atual.sys.sunset)}`));

  corpo.appendChild(imagem);
  corpo.appendChild(detalhes);
  tempoAtual.replaceChildren(corpo);

  const tresDias = obterTresDias(previsao.list);
  listaPrevisao.replaceChildren();

  tresDias.forEach((item) => {
    const li = document.createElement("li");
    const valor = document.createElement("strong");
    li.append(`${rotuloPrevisao(item.dt)}: `);
    valor.textContent = `${Math.round(item.main.temp)}°C`;
    li.appendChild(valor);
    listaPrevisao.appendChild(li);
  });
}

async function apiFetch() {
  try {
    const [respostaAtual, respostaPrevisao] = await Promise.all([
      fetch(urlAtual),
      fetch(urlPrevisao),
    ]);

    if (respostaAtual.ok && respostaPrevisao.ok) {
      const dadosAtual = await respostaAtual.json();
      const dadosPrevisao = await respostaPrevisao.json();
      mostrarResultados(dadosAtual, dadosPrevisao);
    } else {
      throw Error(await respostaAtual.text());
    }
  } catch (erro) {
    console.log(erro);
    mostrarErro();
  }
}

apiFetch();
