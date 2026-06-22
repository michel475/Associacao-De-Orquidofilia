# Estratégias de Validação - ReproducaoFlor x Orquidario

## 🎯 Problema Identificado
Seu serviço está com validações comentadas porque injetar `OrquidarioRepository` no `ReproducaoFlorRepository` quebrava a aplicação. A solução é **não fazer isso no repository**, mas sim:

1. **No Service** → injetar o repositório do Orquidário
2. **No Repository** → usar **relations do TypeORM** para carregar dados associados
3. **Tratamento de Erro** → criar exceções específicas

---

## ✅ Estratégia 1: Injetar Dependência no SERVICE (não no Repository)

### Por que funciona?
- O repository fica **simples e focado em persistência**
- O service fica responsável pela **lógica de negócio**
- Respeita o **padrão de injeção do NestJS**
- Sem ciclos de dependência

### Exemplo: Validar FK e Duplicação

```typescript
// ❌ ERRADO - Injetar no repository causa ciclos
export class ReproducaoFlorTypeOrmRepository {
    constructor(
        @InjectRepository(ReproducaoFlorOrmEntity) private repo: Repository<ReproducaoFlorOrmEntity>,
        @InjectRepository(OrquidarioOrmEntity) private orqRepo: Repository<OrquidarioOrmEntity>, // ❌ Problema!
    ) {}
}

// ✅ CORRETO - Injetar no service
@Injectable()
export class ReproducaoFlorService {
    constructor(
        @Inject('ReproducaoFlorRepositoryPort') private reproducaoFlorRepo: ReproducaoFlorRepositoryPort,
        @Inject('OrquidarioRepositoryPort') private orquidarioRepo: OrquidarioRepositoryPort, // ✅ Certo!
    ) {}
}
```

---

## ✅ Estratégia 2: Usar RELATIONS do TypeORM no Repository

### Conceito
Ao buscar um `ReproducaoFlor`, carregar também seu `Orquidario` e todas as `reproducoes` do Orquidário para validações.

### Implementação no Repository

```typescript
// reproducaoFlor.typeorm.repository.ts

async findByIdWithOrquidario(id: number): Promise<ReproducaoFlorOrmEntity | null> {
    return await this.repo.findOne({
        where: { id },
        relations: ['orquidario', 'orquidario.reproducoes'] // Carrega relacionamentos
    });
}

async findByOrquidarioIdAndHibridoNome(orquidarioId: number, hibridoNome: string): Promise<ReproducaoFlorOrmEntity | null> {
    return await this.repo.findOne({
        where: { orquidarioId, hibridoNome }
    });
}
```

### Como usar no Service:
```typescript
async create(orquidarioId: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
    
    // 1️⃣ Validar campos obrigatórios
    if (!hibridoNome || !dataGerminacao) 
        throw new InvalidPayload("Todos os campos são obrigatórios");
    
    // 2️⃣ Verificar se Orquidário existe (FK Constraint)
    const orquidario = await this.orquidarioRepo.findById(orquidarioId);
    if (!orquidario) 
        throw new OrquidarioNotFoundException(orquidarioId);
    
    // 3️⃣ Validar consistência temporal
    if (dataGerminacao < orquidario.dataCriacao)
        throw new InvalidDataGerminacao(dataGerminacao, orquidario.dataCriacao);
    
    // 4️⃣ Validar taxaSucessoPct
    if (taxaSucessoPct < 0 || taxaSucessoPct > 100)
        throw new InvalidRangeTaxaSucessoPct(taxaSucessoPct);
    
    // 5️⃣ Validar regra viabilidade
    if (viavel === true && taxaSucessoPct <= 70)
        throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
    if (viavel === false && taxaSucessoPct > 30)
        throw new InvalidTaxaSucessoPctViabilidade(taxaSucessoPct, viavel);
    
    // 6️⃣ Validar hibridoNome duplicado NO MESMO ORQUIDÁRIO
    const existente = await this.reproducaoFlorRepo.findByOrquidarioIdAndHibridoNome(orquidarioId, hibridoNome);
    if (existente) 
        throw new HibridoNomeAlreadyExists(hibridoNome, orquidarioId);
    
    // ✅ Tudo validado, criar
    const reproducaoFlor = new ReproducaoFlor(null, orquidarioId, hibridoNome, dataGerminacao, viavel, taxaSucessoPct);
    return this.reproducaoFlorRepo.create(reproducaoFlor);
}
```

---

## ✅ Estratégia 3: Tratamento de Erro para Unique Constraint

### Problema
Quando `hibridoNome` é `UNIQUE` no banco, se não validar no service, o TypeORM lança `QueryFailedError`. Você quer capturar isso e formatar.

### Solução: Exception Filter ou Try-Catch no Repository

**Opção A: Capturar no Repository**
```typescript
async create(reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor> {
    try {
        const orm = this.repo.create({
            orquidarioId: reproducaoFlor.orquidarioId,
            hibridoNome: reproducaoFlor.hibridoNome,
            dataGerminacao: reproducaoFlor.dataGerminacao,
            viavel: reproducaoFlor.viavel,
            taxaSucessoPct: reproducaoFlor.taxaSucessoPct,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') { // MySQL e PostgreSQL
            throw new HibridoNomeAlreadyExists(reproducaoFlor.hibridoNome, reproducaoFlor.orquidarioId);
        }
        if (error.code === 'SQLITE_CONSTRAINT') { // SQLite
            throw new HibridoNomeAlreadyExists(reproducaoFlor.hibridoNome, reproducaoFlor.orquidarioId);
        }
        throw error;
    }
}
```

**Opção B: Exception Filter (mais elegante)**
```typescript
// appExceptionFilter.ts - ADICIONAR

catch(exception: unknown, host: ArgumentsHost): void {
    // ... código existente ...
    
    // Capturar erro de constraint violada do TypeORM
    if (exception instanceof QueryFailedError) {
        if (exception.code === 'ER_DUP_ENTRY' || exception.code === '23505') {
            const match = exception.message.match(/Duplicate entry '([^']+)'/);
            const duplicateValue = match ? match[1] : 'unknown';
            errorResponse = {
                status: HttpStatus.CONFLICT,
                message: 'Conflito de dados',
                error: 'DUPLICATE_HIBRIDONOME',
                detail: [{
                    campo: 'hibridoNome',
                    code: 'UNIQUE_CONSTRAINT_VIOLATION',
                    description: `Híbrido com nome '${duplicateValue}' já existe para este orquidário`
                }]
            };
        }
    }
}
```

---

## 📊 Fluxo Completo de Validação

```
┌─────────────────────────────────────────┐
│   Controller (CreateReproducaoFlorDTO)  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│   ReproducaoFlorService.create()        │
│                                          │
│  1. ✅ Campos obrigatórios              │
│  2. ✅ FK: Orquidário existe?            │
│  3. ✅ Temporal: dataGerminacao >= dataCriacao │
│  4. ✅ Taxa: 0-100                      │
│  5. ✅ Viabilidade: taxa vs viável      │
│  6. ✅ Único: hibridoNome no orquidário │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│ ReproducaoFlorRepository.create()       │
│ (Catch erros de banco: ER_DUP_ENTRY)   │
└────────────────┬────────────────────────┘
                 │
                 ▼
          ✅ Salvo no DB
```

---

## 🔍 Exemplo com Relations para Validação Alternativa

Se você quiser validar `hibridoNome` duplicado carregando todas as reproduções do orquidário:

```typescript
// Adicionar ao repository
async findByIdWithReproducoes(id: number): Promise<OrquidarioOrmEntity | null> {
    return await this.repo.findOne({
        where: { id },
        relations: ['reproducoes'] // Carrega todas as reproduções
    });
}

// No service
const orquidarioComReproducoes = await this.orquidarioRepo.findByIdWithReproducoes(orquidarioId);

// Verificar duplicação
const jaExiste = orquidarioComReproducoes.reproducoes.some(r => r.hibridoNome === hibridoNome);
if (jaExiste) {
    throw new HibridoNomeAlreadyExists(hibridoNome, orquidarioId);
}
```

---

## 🛠️ Resumo das Exceções Necessárias

```typescript
// Reutilizar e complementar:

1. InvalidPayload ✅ (já existe) - campos obrigatórios
2. OrquidarioNotFoundException ✅ (já existe) - FK
3. InvalidDataGerminacao ✅ (já existe) - temporal
4. InvalidRangeTaxaSucessoPct ✅ (já existe) - range
5. InvalidTaxaSucessoPctViabilidade ✅ (já existe) - regra negócio
6. HibridoNomeAlreadyExists ✅ (já existe) - unique

// Melhorar:
- Capturar exceptions de banco no Filter
- Adicionar detalhes nos erros (campo, código, descrição)
```

---

## ✨ Próximos Passos

1. **Adicionar método no repository:** `findByOrquidarioIdAndHibridoNome()`
2. **Injetar OrquidarioRepository no Service** (não no Repository)
3. **Descomentar validações** no service com injeção correta
4. **Melhorar Exception Filter** para capturar QueryFailedError
5. **Testar** todas as validações

---

## ⚠️ Armadilhas Comuns

| ❌ Errado | ✅ Correto |
|----------|-----------|
| Injetar repo A no repo B | Injetar repo A no Service |
| Não carregar relations | Usar `.findOne({ relations: [...] })` |
| Deixar erro de BD chegar ao usuário | Capturar no Filter e formatar |
| Validar apenas no DTO | Validar também no Service (lógica) |
| Usar constraints do DB como única validação | DB é 2ª camada; 1ª é o Service |

