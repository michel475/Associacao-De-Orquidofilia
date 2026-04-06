import { FunctionTool } from '@google/adk';
import { Repository } from 'typeorm';
import { OrquidarioOrmEntity } from "../../modules/orquidario/infrastructure/persistence/typeorm/orquidario.orm-entity"
import { z }  from 'zod';

export const createOrquidarioConsultaTool = (repo: Repository<OrquidarioOrmEntity>) => {
    return new FunctionTool({
        name: 'get_orquidario_stats',
        description: 'Consulta o banco de dados para obter informações a respeito dos orquidarios',
        schema: z.object({
            operation: z.enum(['sum', 'count', 'avg']).describe("Operação para realizar consulta"),
            hibridoNome: z.string().optional().describe('Filtrando pelo hibrido nome'),
        }),
        execute: async ({ operation, hibridoNome }) => {
        const query = repo.createQueryBuilder('sale');
        
        if (hibridoNome) {
            query.where('reproducoes.hibridoNome = :name', { name: hibridoNome });
        }

        if(operation === 'count'){
            query.getMany()
        }
        // ... outras operações
        return { message: "Operação realizada com sucesso" };
        },
    })
}