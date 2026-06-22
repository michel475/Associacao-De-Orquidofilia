# Associação de Orquidofilia

Bem-vindo ao repositório do projeto **Associação de Orquidofilia**. Este é um monorepo gerenciado com [Turborepo](https://turbo.build/) e [pnpm](https://pnpm.io/), projetado para unificar o desenvolvimento do frontend e backend da aplicação, junto com seus pacotes e configurações compartilhadas.

## 👥 Responsáveis

Este projeto é desenvolvido e mantido por:
- **Amanda**
- **Michel**

## 🏗️ Estrutura do Projeto

A arquitetura do monorepo está dividida em aplicações principais e pacotes utilitários:

### Aplicações (`apps/`)
- **`frontend`**: Aplicação web (interface de usuário).
- **`backend`**: API e lógica de servidor.

### Pacotes Compartilhados (`packages/`)
- **`ui`**: Biblioteca de componentes base compartilhada.
- **`eslint-config`**: Configurações de padronização de código (ESLint) para todo o monorepo.
- **`typescript-config`**: Configurações base do TypeScript (`tsconfig.json`).

## 📐 Decisões Arquiteturais e Tecnologias

- **Estilização Combinada:** Escolhemos utilizar **Tailwind CSS** juntamente com o **Angular Material**. O Tailwind traz extrema flexibilidade para ajustes ágeis de layout e design responsivo (utility-first), enquanto o Angular Material fornece componentes robustos e acessíveis de forma padronizada.
- **Autenticação Segura:** Utilizamos **JWT (JSON Web Token)** para gerenciar sessões e segurança. O frontend possui interceptadores HTTP que identificam o token no `localStorage` e anexam automaticamente no cabeçalho das requisições para acessar endpoints protegidos do backend.

### 🛤️ Exemplos de Rotas (Frontend)
- **Públicas:** `/login` (autenticação).
- **Privadas:** `/home` (rota restrita exigindo validação via JWT).
- **Redirecionamentos:** `/access-denied` (em caso de falha de autorização ou token expirado).

## 🚀 Como Inicializar o Projeto

Siga os passos abaixo para preparar e rodar o ambiente de desenvolvimento na sua máquina.

### 1. Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation) (gerenciador de pacotes padrão do projeto)

### 2. Instalação de Dependências
Na raiz do projeto (pasta `Associacao-De-Orquidofilia`), instale todas as dependências necessárias executando:

```sh
pnpm install
```

### 3. Executando em Ambiente de Desenvolvimento
Para iniciar todos os projetos (frontend e backend) simultaneamente em modo de desenvolvimento, utilize o comando:

```sh
pnpm dev
```
*(O Turborepo cuidará de iniciar os servidores de ambas as aplicações em paralelo de forma otimizada).*

### 4. Build para Produção
Para gerar a versão otimizada e pronta para produção de todas as aplicações e pacotes, execute:

```sh
pnpm build
```

## 🛠️ Comandos Úteis e Avançados

O uso do Turborepo permite executar scripts em aplicações específicas através de filtros. Alguns exemplos:

- **Rodar apenas o frontend:**
  ```sh
  pnpm turbo dev --filter=frontend
  ```
- **Rodar apenas o backend:**
  ```sh
  pnpm turbo dev --filter=backend
  ```
- **Executar verificação de código (Lint):**
  ```sh
  pnpm lint
  ```

---
*Para informações avançadas sobre o funcionamento do monorepo, consulte a documentação oficial do [Turborepo](https://turbo.build/repo/docs) e do [pnpm](https://pnpm.io/motivation).*
