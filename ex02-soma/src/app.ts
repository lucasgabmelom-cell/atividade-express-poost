// Importa a biblioteca Express e também os tipos Express, Request e Response
import express from "express";
import type { Express, Request, Response } from "express";


// Cria uma aplicação Express
const app: Express = express();


// Middleware para interpretar JSON no corpo (body) das requisições
app.use(express.json());


// Define a porta onde o servidor ficará disponível
const PORT: number = 8081;


// Interface para tipar os dados esperados no body (usando unknown para validar com segurança)
interface SomaBody {
    num1?: unknown;
    num2?: unknown;
    num3?: unknown;
}


// Rota POST /soma
app.post("/soma", (req: Request<{}, {}, SomaBody>, res: Response) => {
    const { num1, num2, num3 } = req.body;


    // Lista para armazenar os problemas encontrados na validação
    const erros: string[] = [];


    // Função auxiliar para verificar se o valor é realmente um número válido
    const ehNumeroValido = (valor: unknown): valor is number => {
        return typeof valor === "number" && !Number.isNaN(valor);
    };


    if (num1 === undefined) {
        erros.push("O campo 'num1' é obrigatório.");
    } else if (!ehNumeroValido(num1)) {
        erros.push("O campo 'num1' deve ser um valor numérico.");
    }


    if (num2 === undefined) {
        erros.push("O campo 'num2' é obrigatório.");
    } else if (!ehNumeroValido(num2)) {
        erros.push("O campo 'num2' deve ser um valor numérico.");
    }


    if (num3 === undefined) {
        erros.push("O campo 'num3' é obrigatório.");
    } else if (!ehNumeroValido(num3)) {
        erros.push("O campo 'num3' deve ser um valor numérico.");
    }


    // Se houver algum problema, retorna status 400 (Bad Request) com a lista de erros
    if (erros.length > 0) {
        res.status(400).json({
            mensagem: "Não foi possível realizar a soma devido aos seguintes problemas:",
            erros,
        });
        return;
    }


    // Realiza a soma após garantir que os 3 campos são numéricos
    const resultado = (num1 as number) + (num2 as number) + (num3 as number);


    res.status(200).json({
        mensagem: `O resultado da soma é ${resultado}`,
        resultado,
    });
});


// Inicializa o servidor utilizando a porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});