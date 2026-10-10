const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

if (botaoMenu && navegacao) {
  botaoMenu.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
  });

  navegacao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        navegacao.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
      }
    });
  });
}
