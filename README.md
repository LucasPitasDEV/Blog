📖 Plataforma de Blog com Next.js & ASP.NET Core

Uma aplicação full-stack de blog que permite aos usuários criar, editar, visualizar e excluir suas próprias postagens.
O projeto combina a ⚡ performance do Next.js no frontend com a 🛡️ robustez do ASP.NET Core no backend, em uma arquitetura moderna e escalável.

🚀 Funcionalidades

✅ Registro e login de usuários
✅ Autenticação via JWT
✅ Criação, edição e exclusão de postagens pelo autor
✅ Listagem e visualização de todas as postagens
✅ Proteção de rotas e endpoints autenticados
✅ Gerenciamento de permissões (usuário só edita/exclui suas próprias postagens)

🛠️ Tecnologias Utilizadas
🌐 Frontend

⚛️ Next.js – Framework React para SSR/SSG

🎨 Tailwind CSS – Estilização moderna e responsiva

🔗 Axios – Comunicação com a API

⚙️ Backend

🖥️ ASP.NET Core Web API (C#) – API RESTful

🗄️ MySQL – Banco de dados relacional

🔑 JWT – Autenticação e permissões seguras

📂 Estrutura do Projeto
/frontend   -> Next.js + Tailwind
/backend    -> ASP.NET Core + MySQL

⚙️ Como Rodar o Projeto
🔧 Pré-requisitos

📌 Node.js >= 18

📌 .NET SDK >= 8.0

📌 MySQL

▶️ Passos
# Clone o repositório
git clone (Link)
cd blog-platform

🔹 Backend
cd backend
# Configure a connection string no appsettings.json
dotnet ef database update
dotnet run

🔹 Frontend
cd frontend
npm install
npm run dev

🔒 Segurança

🔑 Autenticação baseada em JWT

🛡️ Permissões de usuário para proteger recursos críticos

💡 Dica: você pode adicionar badges do Shields.io
 no topo, tipo:

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

🔄 Fluxo da Arquitetura
Frontend (Next.js)

app/ → contém as páginas principais da aplicação.

hooks/ → lógicas reutilizáveis em React para manipulação de estado e dados.

public/ → arquivos estáticos (imagens, ícones, etc).

services/ → responsáveis por fazer as chamadas HTTP para a API do backend.

👉 O frontend envia requisições HTTP REST para o backend através da camada services/.

Backend (ASP.NET Core)

Controllers/ → ponto de entrada da API, recebe requisições do frontend.

DTO/ → objetos de transferência de dados usados para comunicação segura e clara entre camadas.

Interfaces/ → contratos para os serviços e repositórios.

Services/ → contém a lógica de negócio, validações e regras da aplicação.

Repository/ → responsável pela comunicação com o banco de dados.

Models/ → entidades que representam as tabelas do banco.

Migrations/ → controle de versão do banco de dados.

Properties/ → configurações do projeto.

👉 O fluxo segue esta ordem:
Controllers → Services → Repository → Models → Database

Banco de Dados (MySQL)

O Repository realiza as operações de CRUD diretamente no banco.

Alterações de estrutura são gerenciadas pelas Migrations.

📌 Resumo do Fluxo

O usuário interage com o Frontend (Next.js).

O frontend faz chamadas à API REST (ASP.NET Core Controllers).

Os Controllers chamam os Services, que aplicam as regras de negócio.

Os Services utilizam o Repository para acessar os Models e o Banco MySQL.

O resultado retorna pela mesma cadeia até o Frontend, exibindo os dados para o usuário.
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

