# Implementação Completa - Guia Passo a Passo

## ✅ Checklist de Implementação

- [x] Exceção `HibridoNomeAlreadyExists` usa `ConflictException` em vez de `BadRequestException`
- [x] Repository `ReproducaoFlorTypeOrmRepository` tem método `findByOrquidarioIdAndHibridoNome()`
- [x] Repository captura `QueryFailedError` e lança exceção apropriada
- [x] Service injeta `OrquidarioRepositoryPort` (injeção correta, sem ciclos)
- [x] Service valida TODOS os 7 critérios antes de criar/atualizar
- [x] Exception Filter captura `QueryFailedError` e formata resposta
- [x] Relations do TypeORM configuradas corretamente nos ORM entities

---

## 📝 Exemplo de Teste dos Casos de Uso

### Teste 1: Criar ReproducaoFlor com Sucesso

```bash
# 1. Primeiro, criar um orquidário
POST /orquidario
{
  "endereco": "Rua das Flores, 123",
  "dataCriacao": "2026-01-15",
  "irrigadoAuto": true,
  "areaMquadrados": 50
}

# Response: 201 Created
{
  "id": 1,
  "endereco": "Rua das Flores, 123",
  "dataCriacao": "2026-01-15T00:00:00.000Z",
  "irrigadoAuto": true,
  "areaMquadrados": 50
}

# 2. Criar reprodução com sucesso
POST /reproducaoFlor
{
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Trianae x Laelia",
  "dataGerminacao": "2026-02-20",
  "viavel": true,
  "taxaSucessoPct": 85
}

# Response: 201 Created
{
  "id": 1,
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Trianae x Laelia",
  "dataGerminacao": "2026-02-20T00:00:00.000Z",
  "viavel": true,
  "taxaSucessoPct": 85
}
```

---

### Teste 2: FK - Orquidário Não Existe

```bash
POST /reproducaoFlor
{
  "orquidarioId": 999,
  "hibridoNome": "Cattleya Trianae",
  "dataGerminacao": "2026-02-20",
  "viavel": true,
  "taxaSucessoPct": 85
}

# Response: 404 Not Found
{
  "status": 404,
  "message": "Orquidário não encontrado",
  "error": "ORQUIDARIO_NOT_FOUND",
  "detail": [
    {
      "campo": "orquidarioId",
      "code": "ORQUIDARIO_NOT_FOUND",
      "description": "Orquidário com ID 999 não encontrado"
    }
  ]
}
```

---

### Teste 3: Temporal - DataGerminacao Anterior a DataCriacao

```bash
POST /reproducaoFlor
{
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Trianae",
  "dataGerminacao": "2026-01-10",  # ANTES da dataCriacao (2026-01-15)
  "viavel": true,
  "taxaSucessoPct": 85
}

# Response: 400 Bad Request
{
  "status": 400,
  "message": "A data de germinação não pode ser inferior à data de criação do orquidário",
  "error": "INVALID_DATA_GERMINACAO_REPRODUCAO",
  "detail": [
    {
      "code": "INVALID_DATA_GERMINACAO_REPRODUCAO",
      "description": "dataGerminacao (2026-01-10) é anterior a dataCriacao do orquidário (2026-01-15)"
    }
  ]
}
```

---

### Teste 4: Range TaxaSucessoPct Fora de 0-100

```bash
POST /reproducaoFlor
{
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Trianae",
  "dataGerminacao": "2026-02-20",
  "viavel": true,
  "taxaSucessoPct": 150  # Inválido! Máximo 100
}

# Response: 400 Bad Request
{
  "status": 400,
  "message": "Porcentagem informada não é válida",
  "error": "INVALID_TAXA_SUCESSO_PCT",
  "detail": [
    {
      "campo": "taxaSucessoPct",
      "code": "INVALID_TAXA_SUCESSO_PCT",
      "description": "Taxa de sucesso 150 está fora do range 0-100"
    }
  ]
}
```

---

### Teste 5: Viability Rule - viavel=true mas taxaSucessoPct ≤ 70%

```bash
POST /reproducaoFlor
{
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Trianae",
  "dataGerminacao": "2026-02-20",
  "viavel": true,
  "taxaSucessoPct": 65  # ERRO! Se viável=true, precisa ser > 70%
}

# Response: 400 Bad Request
{
  "status": 400,
  "message": "Faixa de porcentagem não é válida para viabilidade",
  "error": "INVALID_TAXA_SUCESSO_PCT",
  "detail": [
    {
      "campo": "taxaSucessoPct",
      "code": "INVALID_TAXA_SUCESSO_PCT",
      "description": "Se viável=true, taxaSucessoPct deve ser > 70%, mas recebeu 65%"
    }
  ]
}
```

---

### Teste 6: Viability Rule - viavel=false mas taxaSucessoPct > 30%

```bash
POST /reproducaoFlor
{
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Trianae",
  "dataGerminacao": "2026-02-20",
  "viavel": false,
  "taxaSucessoPct": 45  # ERRO! Se viável=false, não pode ultrapassar 30%
}

# Response: 400 Bad Request
{
  "status": 400,
  "message": "Faixa de porcentagem não é válida para viabilidade",
  "error": "INVALID_TAXA_SUCESSO_PCT",
  "detail": [
    {
      "campo": "taxaSucessoPct",
      "code": "INVALID_TAXA_SUCESSO_PCT",
      "description": "Se viável=false, taxaSucessoPct não pode ser > 30%, mas recebeu 45%"
    }
  ]
}
```

---

### Teste 7: Unique Constraint - HibridoNome Duplicado NO MESMO ORQUIDÁRIO

```bash
# Reprodução 1 já foi criada com híbrido "Cattleya Trianae x Laelia" no orquidário 1

POST /reproducaoFlor
{
  "orquidarioId": 1,
  "hibridoNome": "Cattleya Trianae x Laelia",  # DUPLICADO!
  "dataGerminacao": "2026-03-15",
  "viavel": true,
  "taxaSucessoPct": 80
}

# Response: 409 Conflict
{
  "status": 409,
  "message": "Conflito de dados",
  "error": "DUPLICATE_HIBRIDONOME",
  "detail": [
    {
      "campo": "hibridoNome",
      "code": "UNIQUE_CONSTRAINT_VIOLATION",
      "description": "Híbrido com nome 'Cattleya Trianae x Laelia' já existe para o orquidário ID 1"
    }
  ]
}
```

---

### Teste 8: Campos Obrigatórios - hibridoNome Meio

```bash
POST /reproducaoFlor
{
  "orquidarioId": 1,
  "hibridoNome": "",  # VAZIO!
  "dataGerminacao": "2026-02-20",
  "viavel": true,
  "taxaSucessoPct": 85
}

# Response: 400 Bad Request
{
  "status": 400,
  "message": "Todos os campos devem obrigatoriamente ser informados",
  "error": "INVALID_PAYLOAD",
  "detail": [
    {
      "code": "INVALID_PAYLOAD",
      "description": "hibridoNome e dataGerminacao são obrigatórios"
    }
  ]
}
```

---

## 🔍 Validações com Relations - Opção Alternativa

Se quiser carregar o orquidário completo com todas suas reproduções:

```typescript
// No Repository - adicionar método
async findByIdWithAllRelations(id: number): Promise<ReproducaoFlorOrmEntity | null> {
    return await this.repo.findOne({
        where: { id },
        relations: ['orquidario', 'orquidario.reproducoes'] // Carrega tudo relacionado
    });
}

// No Service - usar para validações complexas
const reproducaoComRelacoes = await this.reproducaoFlorRepo.findByIdWithAllRelations(id);

// Acessar orquidário e todas suas reproduções
const orquidario = reproducaoComRelacoes.orquidario;
const todasAsReproducoes = orquidario.reproducoes;

// Validar se hibridoNome já existe
const jaExiste = todasAsReproducoes.some(r => r.hibridoNome === hibridoNome && r.id !== id);
if (jaExiste) {
    throw new HibridoNomeAlreadyExists(hibridoNome, orquidario.id);
}
```

---

## 🛠️ Estrutura de Relações no TypeORM

### Orquidário ORM Entity
```typescript
@Entity('orquidario')
export class OrquidarioOrmEntity {
    @OneToMany(() => ReproducaoFlorOrmEntity, (reproducao) => reproducao.orquidario)
    reproducoes: ReproducaoFlorOrmEntity[];
}
```

### ReproducaoFlor ORM Entity
```typescript
@Entity('reproducaoFlor')
export class ReproducaoFlorOrmEntity {
    @ManyToOne(() => OrquidarioOrmEntity, (orquidario) => orquidario.reproducoes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orquidarioId' })
    orquidario: OrquidarioOrmEntity;
}
```

---

## 📚 Ordernar as Validações

```
1. ✅ Campos obrigatórios (InvalidPayload)
   └─ Falha rápido se dados incompletos

2. ✅ Foreign Key (OrquidarioNotFoundException)
   └─ Valida integridade referencial

3. ✅ Consistência Temporal (InvalidDataGerminacao)
   └─ Valida regra de negócio temporal

4. ✅ Range e Tipos (InvalidRangeTaxaSucessoPct)
   └─ Valida formato de dados

5. ✅ Regra Viabilidade (InvalidTaxaSucessoPctViabilidade)
   └─ Valida regra complexa

6. ✅ Unique Constraint (HibridoNomeAlreadyExists)
   └─ Valida unicidade no mesmo orquidário

7. ✅ Persistência (try-catch no repository)
   └─ Captura erros de banco de dados
```

---

## 🚀 Vantagens dessa Arquitetura

| Aspecto | Vantagem |
|--------|---------|
| **Sem ciclos de dependência** | ✅ Service injeta Repository, Repository não injeta Repository |
| **Validação 2 camadas** | ✅ 1ª: Service (lógica); 2ª: Repository (banco) |
| **Relations do TypeORM** | ✅ Carrega dados relacionados quando necessário |
| **Tratamento centralizado** | ✅ Exception Filter formata todos os erros |
| **Erros específicos** | ✅ Cada erro tem seu código e mensagem clara |
| **Futuramente reutilizável** | ✅ Métodos findBy* podem ser usados em outros services |

---

## ⚠️ Troubleshooting

| Problema | Solução |
|----------|---------|
| `Cannot inject repository into repository` | Injetar no Service, não no Repository |
| `hikidoNome undefined em exception` | Verificar se está passando o parâmetro correto |
| `QueryFailedError não está sendo capturado` | Certificar que `QueryFailedError` está importado de `typeorm` |
| `Relations não carregam` | Adicionar `relations: ['field']` no `findOne()` |
| `Erro de banco chega até o usuário` | Adicionar handler na Exception Filter |

