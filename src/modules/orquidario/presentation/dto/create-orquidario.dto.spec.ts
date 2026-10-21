import { plainToInstance } from 'class-transformer';
import { CreateOrquidarioDTO } from './create-orquidario.dto';

describe('CreateOrquidarioDTO', () => {
    it('converts the JSON date string to a Date', () => {
        const dto = plainToInstance(CreateOrquidarioDTO, {
            dataCriacao: '2026-01-09',
        });

        expect(dto.dataCriacao).toBeInstanceOf(Date);
        expect(dto.dataCriacao.toISOString()).toBe('2026-01-09T00:00:00.000Z');
    });
});
