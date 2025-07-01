const usuarioLogado = localStorage.getItem("usuarioLogado");

let autores = JSON.parse(localStorage.getItem("autores")) || [];
let livros = JSON.parse(localStorage.getItem("livros")) || [];

function salvarDados() {
  localStorage.setItem("autores", JSON.stringify(autores));
  localStorage.setItem("livros", JSON.stringify(livros));
}

function atualizarSelectAutores() {
  const selectAutor = document.getElementById("autorLivro");
  if (!selectAutor) return;
  selectAutor.innerHTML = '<option value="">Selecione...</option>';
  autores.forEach((autor, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = autor;
    selectAutor.appendChild(option);
  });
}

function atualizarSelectLivrosDisponiveis() {
  const select = document.getElementById("livroParaAlugar");
  if (!select) return;
  select.innerHTML = '<option value="">Selecione...</option>';
  livros.forEach((livro, index) => {
    if (!livro.alugadoPor) {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = livro.titulo;
      select.appendChild(option);
    }
  });
}

function atualizarSelectLivrosAlugados() {
  const select = document.getElementById("livroParaDevolver");
  if (!select) return;
  select.innerHTML = '<option value="">Selecione...</option>';
  livros.forEach((livro, index) => {
    if (livro.alugadoPor === usuarioLogado) {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = livro.titulo;
      select.appendChild(option);
    }
  });
}

document.getElementById("form-autor")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nomeAutor").value;
  autores.push(nome);
  salvarDados();
  atualizarSelectAutores();
  e.target.reset();
});

document.getElementById("form-livro")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const titulo = document.getElementById("tituloLivro").value;
  const descricao = document.getElementById("descricaoLivro").value;
  const autorIndex = document.getElementById("autorLivro").value;
  if (autorIndex === "") return;
  const livro = {
    titulo,
    descricao,
    autor: autores[autorIndex],
    alugadoPor: null
  };
  livros.push(livro);
  salvarDados();
  atualizarSelectLivrosDisponiveis();
  e.target.reset();
  alert("Livro cadastrado com sucesso!");
});

document.getElementById("form-aluguel")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const livroIndex = document.getElementById("livroParaAlugar").value;
  if (livroIndex === "") return;

  livros[livroIndex].alugadoPor = usuarioLogado;
  salvarDados();
  
  atualizarSelectLivrosDisponiveis();
  atualizarSelectLivrosAlugados();
  e.target.reset();
  alert(`Livro alugado por ${usuarioLogado}!`);
});

document.getElementById("form-devolucao")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const livroIndex = document.getElementById("livroParaDevolver").value;
  if (livroIndex === "") return;

  livros[livroIndex].alugadoPor = null;
  salvarDados();
  
  atualizarSelectLivrosDisponiveis();
  atualizarSelectLivrosAlugados();
  e.target.reset();
  alert("Livro devolvido com sucesso!");
});

document.getElementById("btn-limpar")?.addEventListener("click", function () {
  if (confirm("Tem certeza que deseja apagar todos os dados?")) {
    localStorage.clear();
    alert("Todos os dados foram apagados. Você será redirecionado para a página de cadastro.");
    window.location.href = "cadastro.html";
  }
});

document.getElementById("btn-logout")?.addEventListener("click", function () {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
});

if (usuarioLogado) {
  document.getElementById("display-usuario").textContent = `Usuário: ${usuarioLogado}`;
}

atualizarSelectAutores();
atualizarSelectLivrosDisponiveis();
atualizarSelectLivrosAlugados();