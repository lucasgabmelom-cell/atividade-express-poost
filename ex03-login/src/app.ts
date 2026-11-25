// Importa a biblioteca Express e também os tipos Express, Request e Response
import express from "express";
import type { Express, Request, Response } from "express";


// Cria uma aplicação Express
const app: Express = express();


// Middleware para interpretar JSON no corpo (body) das requisições
app.use(express.json());


// Define a porta onde o servidor ficará disponível
const PORT: number = 8081;


// Interface para tipar os dados esperados no body
interface LoginBody {
    usuario?: string;
    senha?: string;
}


// Credenciais esperadas (simulando um cadastro válido)
const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "123456";


// Rota POST /login
app.post("/login", (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { usuario, senha } = req.body;


    // Verifica se ambos os campos foram enviados no body
    if (!usuario || !senha) {
        res.status(400).json({
            erro: "Os campos 'usuario' e 'senha' são obrigatórios.",
        });
        return;
    }


    // Verifica se o usuário e a senha correspondem aos valores esperados
    if (usuario !== USUARIO_CORRETO || senha !== SENHA_CORRETA) {
        res.status(401).json({
            erro: `Falha na autenticação: usuário '${usuario}' ou senha incorretos.`,
        });
        return;
    }


    // Caso estejam corretos, retorna sucesso (Status 200)
    res.status(200).json({
        mensagem: `Login realizado com sucesso! Bem-vindo, ${usuario}!`,
    });
});


// Inicializa o servidor utilizando a porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});