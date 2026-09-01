const botaoMenu = document.getElementById("menu-hamburguer");
const navegacao = document.getElementById("navegacao-principal");

function alternarMenu() {
  const menuAberto = navegacao.classList.toggle("aberto");
  botaoMenu.classList.toggle("aberto", menuAberto);
  botaoMenu.setAttribute("aria-expanded", menuAberto);
}

botaoMenu.addEventListener("click", alternarMenu);

navegacao.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      navegacao.classList.remove("aberto");
      botaoMenu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
    }
  });
});
