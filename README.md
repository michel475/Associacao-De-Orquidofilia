# Associação de Orquidofilia - API REST

## 👥 Integrantes da Dupla

- **Amanda Espíndola de Almeida**
- **Michel Aguiar Cardoso**

## 🌸 Tema do Projeto

**TEMA 5: Associação de Orquidofilia**

Uma aplicação RESTful desenvolvida com NestJS para gerenciar orquidários e o processo de reprodução de flores híbridas.



## 🔷 Arquitetura Hexagonal

A aplicação foi desenvolvida utilizando a **Arquitetura Hexagonal** (também conhecida como Ports & Adapters), um padrão arquitetural que promove:

- **Independência de Frameworks**: A lógica de negócio é desacoplada de dependências externas
- **Testabilidade**: Facilita a criação de testes unitários sem dependências do banco de dados ou framework
- **Manutenibilidade**: Código organizado em camadas bem definidas
- **Escalabilidade**: Permite fácil adição de novos adapters sem alterar a lógica central



## 🏗️ Estrutura da Arquitetura do Projeto

O projeto segue a arquitetura **Hexagonal (Ports & Adapters)** organizada em camadas:

```
src/
├── modules/
│   ├── orquidario/          (Amanda)
│   │   ├── application/     (Serviço e Ports)
│   │   ├── domain/          (Entidade e Exceções)
│   │   ├── infrastructure/  (Repositório TypeORM)
│   │   └── presentation/    (Controller e DTOs)
│   │
│   └── reproducaoFlor/      (Michel)
│       ├── application/
│       ├── domain/
│       ├── infrastructure/
│       └── presentation/
│
├── shared/                  (Configurações compartilhadas)
│   ├── database/            (TypeORM)
│   └── filters/             (Filtros de exceção)
│
└── utils/                   (Utilitários gerais)
```


## 🗄️ Banco de Dados

- **Banco**: SQLite3
- **ORM**: TypeORM
- **Localização**: `/data` (na raiz do projeto)


## 🚀 Como Configurar e Rodar o Projeto

### Pré-requisitos
- **Node.js** (v18+)
- **npm** (v9+)

### Passos de Instalação

1. **Clonar o repositório** (se aplicável)
```bash
git clone https://github.com/michel475/application.git
cd application
```

2. **Instalar as dependências**
```bash
npm install
```

3. **Executar em modo desenvolvimento**
```bash
npm run start:dev
```

A aplicação estará disponível em: `http://localhost:3000`

### Outros Comandos Úteis

```bash
# Build para produção
npm run build

# Iniciar em modo produção
npm start

# Executar testes
npm test

# Executar testes end-to-end
npm run test:e2e

# Linter
npm run lint
```


## 📋 Principais Endpoints da API

### Módulo Orquidário

#### 1. **Criar Orquidário**
- **Método**: `POST`
- **Endpoint**: `/orquidario`
- **Descrição**: Cria um novo orquidário

**Exemplo de Requisição:**
```json
{
  "id": 1,
  "enderecoOrquidario": "Rua das Flores, 123 - São Paulo, SP",
  "dataCriacao": "2024-01-15",
  "irrigadoAuto": true,
  "areaMquadrados": 150.50
}
```

**Exemplo de Resposta (201 Created):**
```json
{
  "id": 1,
  "enderecoOrquidario": "Rua das Flores, 123 - São Paulo, SP",
  "dataCriacao": "2024-01-15",
  "irrigadoAuto": true,
  "areaMquadrados": 150.50
}
```

---

#### 2. **Listar Todos os Orquidários**
- **Método**: `GET`
- **Endpoint**: `/orquidario`
- **Descrição**: Retorna a lista completa de orquidários

**Exemplo de Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "enderecoOrquidario": "Rua das Flores, 123 - São Paulo, SP",
    "dataCriacao": "2024-01-15",
    "irrigadoAuto": true,
    "areaMquadrados": 150.50
  },
  {
    "id": 2,
    "enderecoOrquidario": "Avenida Principal, 456 - Rio de Janeiro, RJ",
    "dataCriacao": "2024-02-10",
    "irrigadoAuto": false,
    "areaMquadrados": 200.00
  }
]
```

---

#### 3. **Buscar Orquidário por ID**
- **Método**: `GET`
- **Endpoint**: `/orquidario/:id`
- **Descrição**: Retorna um orquidário específico pelo ID
- **Parâmetro**: `id` (exemplo: 1)

**Exemplo de Requisição:**
```
GET /orquidario/1
```

**Exemplo de Resposta (200 OK):**
```json
{
  "id": 1,
  "enderecoOrquidario": "Rua das Flores, 123 - São Paulo, SP",
  "dataCriacao": "2024-01-15",
  "irrigadoAuto": true,
  "areaMquadrados": 150.50
}
```

---

#### 4. **Atualizar Orquidário**
- **Método**: `PUT`
- **Endpoint**: `/orquidario/:id`
- **Descrição**: Atualiza os dados de um orquidário existente
- **Parâmetro**: `id` (exemplo: 1)

**Exemplo de Requisição:**
```json
{
  "endereco": "Rua das Flores, 789 - São Paulo, SP",
  "dataCriacao": "2024-01-15",
  "irrigadoAuto": true,
  "areaMquadrados": 175.00
}
```

**Exemplo de Resposta (200 OK):**
```json
{
  "id": 1,
  "endereco": "Rua das Flores, 789 - São Paulo, SP",
  "dataCriacao": "2024-01-15",
  "irrigadoAuto": true,
  "areaMquadrados": 175.00
}
```

---

### Módulo Reprodução Flor (Michel Aguiar Cardoso)

#### 1. **Criar Reprodução de Flor**
- **Método**: `POST`
- **Endpoint**: `/reproducaoFlor`
- **Descrição**: Registra um novo processo de reprodução de flor

**Exemplo de Requisição:**
```json
{
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Híbrida Amarela",
  "dataGerminacao": "2024-03-01",
  "viavel": true,
  "taxaSucessoPct": 85.50
}
```

**Exemplo de Resposta (201 Created):**
```json
{
  "id": 1,
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Híbrida Amarela",
  "dataGerminacao": "2024-03-01",
  "viavel": true,
  "taxaSucessoPct": 85.50
}
```

---

#### 2. **Listar Todas as Reproduções de Flores**
- **Método**: `GET`
- **Endpoint**: `/reproducaoFlor/listar`
- **Descrição**: Retorna a lista completa de reproduções

**Exemplo de Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "orquidarioId": 1,
    "hibridoNome": "Cattleya Híbrida Amarela",
    "dataGerminacao": "2024-03-01",
    "viavel": true,
    "taxaSucessoPct": 85.50
  },
  {
    "id": 2,
    "orquidarioId": 2,
    "hibridoNome": "Oncidium Híbrido Rosa",
    "dataGerminacao": "2024-02-15",
    "viavel": true,
    "taxaSucessoPct": 92.00
  }
]
```

---

#### 3. **Buscar Reprodução por ID**
- **Método**: `GET`
- **Endpoint**: `/reproducaoFlor/:id`
- **Descrição**: Retorna uma reprodução específica pelo ID
- **Parâmetro**: `id` (exemplo: 1)

**Exemplo de Requisição:**
```
GET /reproducaoFlor/1
```

**Exemplo de Resposta (200 OK):**
```json
{
  "id": 1,
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Híbrida Amarela",
  "dataGerminacao": "2024-03-01",
  "viavel": true,
  "taxaSucessoPct": 85.50
}
```

---

#### 4. **Atualizar Reprodução de Flor**
- **Método**: `PATCH`
- **Endpoint**: `/reproducaoFlor/update/:orquidarioId`
- **Descrição**: Atualiza os dados de uma reprodução
- **Parâmetro**: `orquidarioId` (exemplo: 1)

**Exemplo de Requisição:**
```json
{
  "id": 1,
  "hibridoNome": "Cattleya Híbrida Branca",
  "dataGerminacao": "2024-03-01",
  "viavel": true,
<<<<<<< HEAD
  "taxaSucessoPct": 90.00
=======
  "taxaSucessoPct": 90
>>>>>>> origin/associacao-orquidofilia
}
```

**Exemplo de Resposta (200 OK):**
```json
{
  "id": 1,
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Híbrida Branca",
  "dataGerminacao": "2024-03-01",
  "viavel": true,
<<<<<<< HEAD
  "taxaSucessoPct": 90.00
=======
  "taxaSucessoPct": 90
>>>>>>> origin/associacao-orquidofilia
}
```

---

#### 5. **Deletar Reprodução de Flor**
- **Método**: `DELETE`
- **Endpoint**: `/reproducaoFlor/deletar/:id`
- **Descrição**: Remove um registro de reprodução pelo ID
- **Parâmetro**: `id` (exemplo: 1)

**Exemplo de Requisição:**
```
DELETE /reproducaoFlor/deletar/1
```

<<<<<<< HEAD
**Exemplo de Resposta (200 OK):**
```json
{
  "message": "Reprodução deletada com sucesso"
}
```

=======
>>>>>>> origin/associacao-orquidofilia

## 📊 Divisão de Tarefas

### **Amanda Espíndola de Almeida**
- ✅ Implementação do **Módulo Orquidário** completo
  - Criação do serviço de orquidário
  - Implementação do repositório TypeORM
  - Desenvolvimento do controller com endpoints
  - Criação de DTOs (Data Transfer Objects)
  - Tratamento de exceções específicas do módulo
  - Validações de dados

### **Michel Aguiar Cardoso**
- ✅ Implementação do **Módulo Reprodução Flor** completo
  - Criação do serviço de reprodução de flores
  - Implementação do repositório TypeORM
  - Desenvolvimento do controller com endpoints
  - Criação de DTOs (Data Transfer Objects)
  - Tratamento de exceções específicas do módulo
  - Validações de dados


---

## 📖 Documentação

A documentação da API está disponível via **Swagger** em:
```
http://localhost:3000/api/
```

---

<<<<<<< HEAD
## 🧪 Testes

Para executar os testes unitários e de integração:

```bash
# Executar testes
npm test

# Executar com cobertura
npm run test:cov

# Executar em modo watch
npm test:watch

# Executar testes end-to-end
npm run test:e2e
=======
Para executar:

```bash

# Executar em modo watch
npm run start:dev

>>>>>>> origin/associacao-orquidofilia
```

---

## 📝 Licença

UNLICENSED


**Desenvolvido como parte da Atividade Avaliativa Bimestral: Desenvolvimento de APIs com Relacionamentos 1:N em typeorm e Arquitetura Hexagonal** 🚀
