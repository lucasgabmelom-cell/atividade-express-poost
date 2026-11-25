// Importa a biblioteca Express e também os tipos Express, Request e Response
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";


// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();


// Middleware que permite ao Express interpretar JSON no corpo (body) das requisições
app.use(express.json());


// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;


// Interface para tipar os dados esperados no body da requisição
interface MensagemBody {
  nome: string;
  idade: number;
  timeFavorito: string;
}


// Rota POST /mensagem
app.post("/mensagem", (req: Request<{}, {}, MensagemBody>, res: Response) => {
  // Extrai os 3 dados do corpo da requisição
  const { nome, idade, timeFavorito } = req.body;


  // Validação simples para garantir que todos os campos foram enviados
  if (!nome || idade === undefined || !timeFavorito) {
    res.status(400).json({
      erro: "Por favor, envie nome, idade e timeFavorito no corpo da requisição.",
    });
    return;
  }


  // Monta e retorna a frase solicitada
  const frase = `Olá, ${nome}! Você tem ${idade} anos e torce para o ${timeFavorito}!`;


  res.status(200).send(frase);
});


// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});