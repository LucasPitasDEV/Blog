📖 Plataforma de Blog com Next.js e ASP.NET Core

Uma aplicação full-stack de blog desenvolvida para permitir que usuários criem, editem, visualizem e excluam suas próprias postagens.
O projeto combina a performance do Next.js no frontend com a robustez do ASP.NET Core no backend, utilizando uma arquitetura moderna e escalável.

🚀 Funcionalidades

Registro e login de usuários

Autenticação via JWT

Criação, edição e exclusão de postagens pelo autor

Listagem e visualização de todas as postagens

Proteção de rotas e endpoints autenticados

Gerenciamento de permissões (usuário só edita/exclui suas próprias postagens)

🛠️ Tecnologias Utilizadas
Frontend

Next.js – Framework React para SSR/SSG

Tailwind CSS – Estilização moderna e responsiva

Axios – Comunicação com a API

Backend

ASP.NET Core Web API (C#) – Criação da API RESTful

MySQL – Banco de dados relacional para persistência

JWT – Autenticação segura e gerenciamento de permissões

📂 Estrutura do Projeto
/frontend  -> Next.js + Tailwind
/backend   -> ASP.NET Core + MySQL

⚙️ Como Rodar o Projeto
Pré-requisitos

Node.js >= 18

.NET SDK >= 8.0

MySQL

Passos

Clone o repositório

git clone {Link}
cd blog-platform


Configure o backend

Acesse a pasta /backend

Configure a connection string no appsettings.json

Rode as migrations e inicie a API

dotnet ef database update
dotnet run


Configure o frontend

Acesse a pasta /frontend

Instale as dependências e inicie

npm install
npm run dev

🔒 Segurança

Autenticação baseada em JWT

Permissões de usuário para proteger recursos críticos

Criar painel de administração
