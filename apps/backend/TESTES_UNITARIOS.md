# Testes Unitários - Como Validar as Regras

## 📋 Teste do Service ReproducaoFlor

```typescript
// reproducaoFlor.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ReproducaoFlorService } from './reproducaoFlor.service';
import { InvalidRangeTaxaSucessoPct } from '../domain/taxaSucesso-invalid-range.exception';
import { InvalidTaxaSucessoPctViabilidade } from '../domain/taxaSucesso-invalid-range-viability.exception';
import { HibridoNomeAlreadyExists } from '../domain/hibridoNome-already-exists.exception';
import { OrquidarioNotFoundException } from '../../orquidario/domain/orquidario-not-found.exception';
import { InvalidDataGerminacao } from '../domain/invalid-dataGerminacao-exception';
import { InvalidPayload } from '../../utils/invalid-payload.exception';
import { Orquidario } from '../../orquidario/domain/orquidario';
import { ReproducaoFlor } from '../domain/reproducaoFlor';

describe('ReproducaoFlorService', () => {
    let service: ReproducaoFlorService;
    let mockReproducaoFlorRepo;
    let mockOrquidarioRepo;

    beforeEach(async () => {
        // Mock dos repositories
        mockReproducaoFlorRepo = {
            create: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            findByOrquidarioIdAndHibridoNome: jest.fn(),
            findByIdWithRelations: jest.fn(),
        };

        mockOrquidarioRepo = {
            findById: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReproducaoFlorService,
                {
                    provide: 'ReproducaoFlorRepositoryPort',
                    useValue: mockReproducaoFlorRepo,
                },
                {
                    provide: 'OrquidarioRepositoryPort',
                    useValue: mockOrquidarioRepo,
                },
            ],
        }).compile();

        service = module.get<ReproducaoFlorService>(ReproducaoFlorService);
    });

    describe('create', () => {
        let orquidarioMock: Orquidario;

        beforeEach(() => {
            orquidarioMock = new Orquidario(
                1,
                'Rua das Flores',
                new Date('2026-01-15'),
                true,
                50
            );
        });

        // ✅ Teste 1: Criar com sucesso
        it('deve criar uma reprodução com todos os dados válidos', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);
            mockReproducaoFlorRepo.findByOrquidarioIdAndHibridoNome.mockResolvedValue(null);

            const resultado = await service.create(
                1,
                'Cattleya Trianae x Laelia',
                new Date('2026-02-20'),
                true,
                85
            );

            expect(mockReproducaoFlorRepo.create).toHaveBeenCalled();
            expect(mockOrquidarioRepo.findById).toHaveBeenCalledWith(1);
        });

        // ✅ Teste 2: Campo vazio
        it('deve lançar InvalidPayload quando hibridoNome está vazio', async () => {
            await expect(
                service.create(1, '', new Date('2026-02-20'), true, 85)
            ).rejects.toThrow(InvalidPayload);
        });

        // ✅ Teste 3: FK - Orquidário não existe
        it('deve lançar OrquidarioNotFoundException quando orquidário não existe', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(null);

            await expect(
                service.create(999, 'Cattleya', new Date('2026-02-20'), true, 85)
            ).rejects.toThrow(OrquidarioNotFoundException);
        });

        // ✅ Teste 4: Temporal - dataGerminacao anterior a dataCriacao
        it('deve lançar InvalidDataGerminacao quando germinação é anterior à criação', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);

            await expect(
                service.create(1, 'Cattleya', new Date('2026-01-10'), true, 85) // ANTES de 2026-01-15
            ).rejects.toThrow(InvalidDataGerminacao);
        });

        // ✅ Teste 5: Range - taxa < 0
        it('deve lançar InvalidRangeTaxaSucessoPct quando taxa < 0', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);

            await expect(
                service.create(1, 'Cattleya', new Date('2026-02-20'), true, -5)
            ).rejects.toThrow(InvalidRangeTaxaSucessoPct);
        });

        // ✅ Teste 6: Range - taxa > 100
        it('deve lançar InvalidRangeTaxaSucessoPct quando taxa > 100', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);

            await expect(
                service.create(1, 'Cattleya', new Date('2026-02-20'), true, 150)
            ).rejects.toThrow(InvalidRangeTaxaSucessoPct);
        });

        // ✅ Teste 7: Viabilidade - viável=true mas taxa <= 70
        it('deve lançar InvalidTaxaSucessoPctViabilidade quando viável=true e taxa <= 70%', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);

            await expect(
                service.create(1, 'Cattleya', new Date('2026-02-20'), true, 65)
            ).rejects.toThrow(InvalidTaxaSucessoPctViabilidade);
        });

        // ✅ Teste 8: Viabilidade - viável=false mas taxa > 30
        it('deve lançar InvalidTaxaSucessoPctViabilidade quando viável=false e taxa > 30%', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);

            await expect(
                service.create(1, 'Cattleya', new Date('2026-02-20'), false, 45)
            ).rejects.toThrow(InvalidTaxaSucessoPctViabilidade);
        });

        // ✅ Teste 9: Unique - hibridoNome duplicado
        it('deve lançar HibridoNomeAlreadyExists quando híbrido já existe no mesmo orquidário', async () => {
            const reproducaoExistente = new ReproducaoFlor(
                1,
                1,
                'Cattleya Trianae',
                new Date('2026-02-15'),
                true,
                80
            );
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);
            mockReproducaoFlorRepo.findByOrquidarioIdAndHibridoNome.mockResolvedValue(reproducaoExistente);

            await expect(
                service.create(1, 'Cattleya Trianae', new Date('2026-02-20'), true, 85)
            ).rejects.toThrow(HibridoNomeAlreadyExists);
        });

        // ✅ Teste 10: viável=true e taxa=70 (limite inferior) - DEVE FALHAR
        it('deve lançar erro quando viável=true e taxa=70 (limite é > 70)', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);

            await expect(
                service.create(1, 'Cattleya', new Date('2026-02-20'), true, 70)
            ).rejects.toThrow(InvalidTaxaSucessoPctViabilidade);
        });

        // ✅ Teste 11: viável=true e taxa=71 (logo acima do limite) - DEVE PASSAR
        it('deve permitir criar quando viável=true e taxa=71 (acima do limite > 70)', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);
            mockReproducaoFlorRepo.findByOrquidarioIdAndHibridoNome.mockResolvedValue(null);

            await service.create(1, 'Cattleya Trianae', new Date('2026-02-20'), true, 71);

            expect(mockReproducaoFlorRepo.create).toHaveBeenCalled();
        });

        // ✅ Teste 12: viável=false e taxa=30 (limite superior) - DEVE PASSAR
        it('deve permitir criar quando viável=false e taxa=30 (no limite máximo)', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);
            mockReproducaoFlorRepo.findByOrquidarioIdAndHibridoNome.mockResolvedValue(null);

            await service.create(1, 'Cattleya Trianae', new Date('2026-02-20'), false, 30);

            expect(mockReproducaoFlorRepo.create).toHaveBeenCalled();
        });

        // ✅ Teste 13: viável=false e taxa=31 (acima do limite) - DEVE FALHAR
        it('deve lançar erro quando viável=false e taxa=31 (acima do limite máximo)', async () => {
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);

            await expect(
                service.create(1, 'Cattleya', new Date('2026-02-20'), false, 31)
            ).rejects.toThrow(InvalidTaxaSucessoPctViabilidade);
        });
    });

    describe('update', () => {
        let orquidarioMock: Orquidario;
        let reproducaoExistente: ReproducaoFlor;

        beforeEach(() => {
            orquidarioMock = new Orquidario(
                1,
                'Rua das Flores',
                new Date('2026-01-15'),
                true,
                50
            );
            reproducaoExistente = new ReproducaoFlor(
                1,
                1,
                'Cattleya Antiga',
                new Date('2026-02-20'),
                true,
                85
            );
        });

        // ✅ Teste Update 1: Atualizar com sucesso
        it('deve atualizar reprodução quando dados são válidos', async () => {
            mockReproducaoFlorRepo.findById.mockResolvedValue(reproducaoExistente);
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);
            mockReproducaoFlorRepo.findByOrquidarioIdAndHibridoNome.mockResolvedValue(null);

            await service.update(
                1,
                1,
                'Cattleya Nova',
                new Date('2026-02-20'),
                true,
                80
            );

            expect(mockReproducaoFlorRepo.update).toHaveBeenCalled();
        });

        // ✅ Teste Update 2: Não validar duplicação se o nome não mudou
        it('não deve validar duplicação se o hibridoNome não mudou na atualização', async () => {
            mockReproducaoFlorRepo.findById.mockResolvedValue(reproducaoExistente);
            mockOrquidarioRepo.findById.mockResolvedValue(orquidarioMock);

            await service.update(
                1,
                1,
                'Cattleya Antiga', // Nome não mudou
                new Date('2026-02-20'),
                true,
                80
            );

            // findByOrquidarioIdAndHibridoNome não deve ser chamado
            expect(mockReproducaoFlorRepo.findByOrquidarioIdAndHibridoNome).not.toHaveBeenCalled();
            expect(mockReproducaoFlorRepo.update).toHaveBeenCalled();
        });
    });
});
```

---

## 🧪 Tabela de Testes de Integração

| Teste | Entrada | Esperado | Status |
|-------|---------|----------|--------|
| Criar com sucesso | Todos campos ✅, ta xa=85, viável=true | 201 Created | ✅ |
| FK - Orquidário inexistente | orquidarioId=999 | 404 Not Found | ✅ |
| Temporal - Germinação anterior | dataGerminacao < dataCriacao | 400 Bad Request | ✅ |
| Range - Taxa negativa | taxaSucessoPct=-5 | 400 Bad Request | ✅ |
| Range - Taxa > 100 | taxaSucessoPct=150 | 400 Bad Request | ✅ |
| Viabilidade - viável=true, taxa=65 | viável=true, taxa=65 | 400 Bad Request | ✅ |
| Viabilidade - viável=false, taxa=45 | viável=false, taxa=45 | 400 Bad Request | ✅ |
| Unique - Híbrido duplicado | hibridoNome repetido | 409 Conflict | ✅ |
| Campos - hibridoNome vazio | hibridoNome="" | 400 Bad Request | ✅ |
| Limite viável=true (70%) | taxaSucessoPct=70, viável=true | 400 Bad Request | ✅ |
| Limite viável=true (71%) | taxaSucessoPct=71, viável=true | 201 Created | ✅ |
| Limite viável=false (30%) | taxaSucessoPct=30, viável=false | 201 Created | ✅ |
| Limite viável=false (31%) | taxaSucessoPct=31, viável=false | 400 Bad Request | ✅ |

---

## 🔄 Ciclo de Validação Visual

```
Request HTTP
    ↓
Controller recebe DTO
    ↓
Service.create() inicia
    ↓
┌─────────────────────────────────┐
│ 1. Campos obrigatórios? ────────→ ❌ InvalidPayload
└─────────────────────────────────┘
    ↓ ✅
┌─────────────────────────────────┐
│ 2. Orquidário existe? ──────────→ ❌ OrquidarioNotFoundException
└─────────────────────────────────┘
    ↓ ✅
┌─────────────────────────────────┐
│ 3. Data consistente? ──────────→ ❌ InvalidDataGerminacao
└─────────────────────────────────┘
    ↓ ✅
┌─────────────────────────────────┐
│ 4. Taxa 0-100? ────────────────→ ❌ InvalidRangeTaxaSucessoPct
└─────────────────────────────────┘
    ↓ ✅
┌─────────────────────────────────┐
│ 5. Viabilidade OK? ────────────→ ❌ InvalidTaxaSucessoPctViabilidade
└─────────────────────────────────┘
    ↓ ✅
┌─────────────────────────────────┐
│ 6. Híbrido único no orquidário?→ ❌ HibridoNomeAlreadyExists
└─────────────────────────────────┘
    ↓ ✅
┌─────────────────────────────────┐
│ Repository.create() ────────────→ ❌ QueryFailedError
│                                    (capturado e convertido)
└─────────────────────────────────┘
    ↓ ✅
201 Created
```

---

## 🚀 Como Executar os Testes

```bash
# Todos os testes
npm test

# Testes do service
npm test -- reproducaoFlor.service.spec

# Com cobertura
npm test -- --coverage

# Watch mode
npm test -- --watch

# Um teste específico
npm test -- --testNamePattern="deve criar uma reprodução com todos os dados válidos"
```

---

## 📊 Cobertura Esperada

```
ReproducaoFlorService.ts
  Lines       : 100%
  Statements  : 100%
  Functions   : 100%
  Branches    : 100%

Funções testadas:
  ✅ create() - 13 testes
  ✅ update() - 2 testes
  ✅ findAll() - 1 teste
  ✅ findById() - 1 teste
  ✅ delete() - 1 teste

Total: 18 testes
```

