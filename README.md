# Associação de Orquidofilia — API REST

API desenvolvida como projeto acadêmico para o gerenciamento de orquidários e de reproduções de flores híbridas.

## Sobre o projeto e a adaptação

O projeto parte do domínio de cadastro de orquidários e o adapta ao contexto de uma associação de orquidofilia. Além de registrar os espaços de cultivo, a API permite registrar reproduções de flores, identificando o híbrido, a data de germinação, a viabilidade e a taxa de sucesso.

A principal ampliação em relação ao cadastro original de orquidários é a inclusão do módulo de reprodução e sua associação com um orquidário por meio de `orquidarioId`. Assim, um orquidário pode estar relacionado a vários registros de reprodução (relação 1:N). O foco é demonstrar uma API REST organizada em módulos e camadas, não uma aplicação comercial completa.

## Funcionalidades

- Criar e consultar orquidários.
- Registrar e consultar reproduções de flores.
- Validar dados de domínio, como endereço e área do orquidário, existência do orquidário associado e taxa de sucesso compatível com a viabilidade informada.
- Consultar a documentação interativa da API pelo Swagger.

## Tecnologias e organização

- Node.js, TypeScript e NestJS.
- SQLite3, com persistência implementada no projeto por meio de decorators e repositórios reflexivos (sem TypeORM).
- Arquitetura em camadas inspirada em Ports & Adapters:
  - `domain`: modelos e exceções de negócio;
  - `application`: serviços e portas de repositório;
  - `infrastructure`: persistência SQLite e repositórios;
  - `presentation`: controllers e DTOs.

Os módulos de domínio estão em `src/modules/orquidario` e `src/modules/reproducaoFlor`. A infraestrutura compartilhada do banco está em `src/shared/database`.

## Requisitos

- Node.js 20 ou superior.
- npm.

## Como instalar e executar

Na raiz do repositório:

```bash
npm install
npm run start:dev
```

A API inicia por padrão em `http://localhost:3000`. O diretório `data` e o banco SQLite `data/app.db` são criados automaticamente quando a aplicação é iniciada.

Para usar outra porta ou outro arquivo de banco, configure `PORT` e `DATABASE_PATH` antes de iniciar. Exemplo em Linux/macOS:

```bash
PORT=4000 DATABASE_PATH=data/desenvolvimento.db npm run start:dev
```

No Windows PowerShell:

```powershell
$env:PORT = "4000"
$env:DATABASE_PATH = "data\desenvolvimento.db"
npm run start:dev
```

### Comandos úteis

```bash
# Compilar
npm run build

# Iniciar sem modo watch
npm start

# Iniciar a versão compilada
npm run start:prod

# Executar testes unitários
npm test

# Executar testes end-to-end
npm run test:e2e

# Executar testes com cobertura
npm run test:cov
```

## Documentação da API

Com a aplicação em execução, acesse o Swagger em [`http://localhost:3000/swagger-ui`](http://localhost:3000/swagger-ui).

### Orquidários

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/orquidario` | Cadastra um orquidário |
| `GET` | `/orquidario` | Lista os orquidários |
| `GET` | `/orquidario/:id` | Consulta um orquidário pelo ID |

Exemplo de criação:

```json
{
  "enderecoOrquidario": "Rua das Flores, 123",
  "dataCriacao": "2025-01-15",
  "irrigadoAuto": true,
  "areaMquadrados": 50
}
```

### Reproduções de flores

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/reproducaoFlor` | Registra uma reprodução |
| `GET` | `/reproducaoFlor` | Lista as reproduções |
| `GET` | `/reproducaoFlor/:id` | Consulta uma reprodução pelo ID |

Exemplo de criação (o `orquidarioId` deve corresponder a um orquidário existente):

```json
{
  "orquidarioId": 1,
  "hibridoNome": "Cattleya trianae x Laelia purpurata",
  "dataGerminacao": "2025-02-01",
  "viavel": true,
  "taxaSucessoPct": 85
}
```

As regras de negócio atuais limitam a taxa de sucesso ao intervalo de 0 a 100. Para uma reprodução marcada como viável, a taxa deve ser superior a 70%; para uma reprodução não viável, deve ser de até 30%. No cadastro de orquidário, o endereço é obrigatório, a área deve ser de pelo menos 10 m² e a data de criação não pode estar no futuro.

## Integrantes

- Michel Aguiar Cardoso

## Licença

Projeto acadêmico, não publicado para distribuição comercial (`UNLICENSED`).
