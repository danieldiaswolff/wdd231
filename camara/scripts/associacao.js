const campoTimestamp = document.getElementById("timestamp");

if (campoTimestamp) {
  campoTimestamp.value = new Date().toLocaleString("pt-BR");
}

document.querySelectorAll(".link-modal").forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
    const modal = document.getElementById(link.dataset.modal);
    if (modal) {
      modal.showModal();
    }
  });
});

document.querySelectorAll("dialog.modal-nivel").forEach((modal) => {
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      modal.close();
    }
  });
});
