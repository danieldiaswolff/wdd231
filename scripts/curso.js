const cursos = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const listaCursos = document.getElementById("lista-cursos");
const totalCreditos = document.getElementById("total-creditos");
const botoesFiltro = document.querySelectorAll(".filtros-cursos button");

function criarCartao(curso) {
  const cartao = document.createElement("article");
  cartao.className = `cartao-curso${curso.completed ? " concluido" : ""}`;
  cartao.innerHTML = `
    <h3>${curso.subject} ${curso.number}</h3>
    <p><strong>${curso.title}</strong></p>
    <p>Créditos: ${curso.credits}</p>
    <p>Tecnologias: ${curso.technology.join(", ")}</p>
    ${curso.completed ? '<span class="etiqueta-concluido">Concluído</span>' : ""}
  `;
  return cartao;
}

function exibirCursos(filtro) {
  const cursosFiltrados =
    filtro === "todos"
      ? cursos
      : cursos.filter((curso) => curso.subject === filtro);

  listaCursos.replaceChildren();
  cursosFiltrados.forEach((curso) => {
    listaCursos.appendChild(criarCartao(curso));
  });

  const creditos = cursosFiltrados.reduce(
    (total, curso) => total + curso.credits,
    0
  );
  totalCreditos.textContent = `Total de créditos exibidos: ${creditos}`;
}

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesFiltro.forEach((item) => {
      item.classList.remove("ativo");
      item.setAttribute("aria-pressed", "false");
    });
    botao.classList.add("ativo");
    botao.setAttribute("aria-pressed", "true");
    exibirCursos(botao.dataset.filtro);
  });
});

exibirCursos("todos");
