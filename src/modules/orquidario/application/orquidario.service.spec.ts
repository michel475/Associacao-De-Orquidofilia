import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Orquidario } from '../domain/orquidario';
import type { OrquidarioRepositoryPort } from './ports/orquidario.repository.port';
import { OrquidarioService } from './orquidario.service';

describe('OrquidarioService queries', () => {
    let repository: jest.Mocked<OrquidarioRepositoryPort>;
    let service: OrquidarioService;

    beforeEach(() => {
        repository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
        };
        service = new OrquidarioService(repository);
    });

    it('returns all repositories results including an empty list', async () => {
        repository.findAll.mockResolvedValue([]);

        await expect(service.findAll()).resolves.toEqual([]);
        expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('returns the orquidario found by a valid id', async () => {
        const orquidario = new Orquidario(
            1,
            'Avenida Presidente Kennedy',
            new Date('2026-01-09T00:00:00.000Z'),
            true,
            55,
        );
        repository.findById.mockResolvedValue(orquidario);

        await expect(service.findById(1)).resolves.toBe(orquidario);
    });

    it('rejects non-positive or unsafe ids without querying the repository', async () => {
        await expect(service.findById(0)).rejects.toBeInstanceOf(
            BadRequestException,
        );
        await expect(service.findById(-1)).rejects.toBeInstanceOf(
            BadRequestException,
        );
        await expect(service.findById(Number.MAX_SAFE_INTEGER + 1)).rejects
            .toBeInstanceOf(BadRequestException);
        expect(repository.findById).not.toHaveBeenCalled();
    });

    it('returns not found when an id does not exist', async () => {
        repository.findById.mockResolvedValue(undefined);

        await expect(service.findById(999)).rejects.toBeInstanceOf(
            NotFoundException,
        );
    });
});
