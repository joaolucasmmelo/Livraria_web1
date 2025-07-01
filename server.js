const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Quando acessar a raiz ("/"), enviar o inputs.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Exemplo de rota de API opcional
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Olá do backend!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
