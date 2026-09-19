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

function rotuloDoDia(carimbo) {
  const rotulo = new Date(carimbo * 1000).toLocaleDateString("pt-BR", {
    weekday: "long",
    timeZone: "America/Sao_Paulo",
  });
  return capitalizar(rotulo);
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

  const hoje = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
  const proximos = Array.from(porDia.entries())
    .filter(([dia]) => dia > hoje)
    .slice(0, 3)
    .map(([, valor]) => valor.item);

  if (proximos.length === 3) {
    return proximos;
  }

  return Array.from(porDia.values())
    .map((valor) => valor.item)
    .slice(0, 3);
}

function mostrarErro() {
  tempoAtual.innerHTML = "";
  const aviso = document.createElement("p");
  aviso.className = "erro";
  aviso.textContent = "Não foi possível carregar o tempo de Joinville.";
  tempoAtual.appendChild(aviso);
  listaPrevisao.replaceChildren();
}

function mostrarResultados(atual, previsao) {
  const descricao = capitalizar(atual.weather[0].description);
  const icone = atual.weather[0].icon;
  const figura = document.createElement("figure");
  const imagem = document.createElement("img");
  const legenda = document.createElement("figcaption");
  const temperatura = document.createElement("p");

  imagem.src = `https://openweathermap.org/img/wn/${icone}@2x.png`;
  imagem.alt = descricao;
  imagem.width = 80;
  imagem.height = 80;
  legenda.textContent = descricao;
  temperatura.className = "temperatura-atual";
  temperatura.textContent = `${Math.round(atual.main.temp)}°C`;

  figura.appendChild(imagem);
  figura.appendChild(legenda);
  tempoAtual.replaceChildren(temperatura, figura);

  const tresDias = obterTresDias(previsao.list);
  listaPrevisao.replaceChildren();

  tresDias.forEach((item) => {
    const li = document.createElement("li");
    const dia = document.createElement("p");
    const valor = document.createElement("p");

    dia.className = "previsao-dia";
    dia.textContent = rotuloDoDia(item.dt);
    valor.className = "previsao-temp";
    valor.textContent = `${Math.round(item.main.temp)}°C`;

    li.appendChild(dia);
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
