import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryFailedError } from 'typeorm';
import { ReproducaoFlorRepositoryPort } from "src/modules/reproducaoFlor/application/ports/reproducaoFlor.repository.port";
import { ReproducaoFlorOrmEntity } from "./reproducaoFlor.orm-entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ReproducaoFlor } from "src/modules/reproducaoFlor/domain/reproducaoFlor";
import { ReproducaoFlorNotFoundException } from "src/modules/reproducaoFlor/domain/reproducaoFlor-not-found.exception";
import { HibridoNomeAlreadyExists } from "src/modules/reproducaoFlor/domain/hibridoNome-already-exists.exception";


@Injectable()
export class ReproducaoFlorTypeOrmRepository implements ReproducaoFlorRepositoryPort {
    constructor(
        @InjectRepository(ReproducaoFlorOrmEntity)
        private readonly repo: Repository<ReproducaoFlorOrmEntity>,
    ) { }

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
            this.handleDatabaseError(error, reproducaoFlor);
            throw error;
        }
    }

    async update(id: number, reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor> {
        const reproducao = await this.repo.findOneBy({ id });
        if (!reproducao) throw new ReproducaoFlorNotFoundException(id);

        reproducao.hibridoNome = reproducaoFlor.hibridoNome
        reproducao.dataGerminacao = reproducaoFlor.dataGerminacao
        reproducao.viavel = reproducaoFlor.viavel
        reproducao.taxaSucessoPct = reproducaoFlor.taxaSucessoPct

        try {
            const saved = await this.repo.save(reproducao);
            return this.toDomain(saved);
        } catch (error) {
            this.handleDatabaseError(error, reproducaoFlor);
            throw error;
        }
    }

    async findAll(): Promise<ReproducaoFlor[] | null> {
        const reproducoes = await this.repo.find({ order: { id: 'ASC' } });
        return reproducoes.map(this.toDomain);
    }

    async findById(id: number): Promise<ReproducaoFlor | null> {
        const reproducao = await this.repo.findOneBy({ id });
        if (!reproducao)
            throw new HttpException("Reprodução Flor não foi encontrada", HttpStatus.NOT_FOUND);
        return this.toDomain(reproducao);
    }

    /**
     * Busca uma reprodução pelo orquidarioId e hibridoNome
     * Útil para validar duplicidade de híbrido no mesmo orquidário
     */
    async findByOrquidarioIdAndHibridoNome(orquidarioId: number, hibridoNome: string): Promise<ReproducaoFlor | null> {
        const reproducao = await this.repo.findOne({
            where: { orquidarioId, hibridoNome }
        });
        return reproducao ? this.toDomain(reproducao) : null;
    }

    /**
     * Busca uma reprodução com suas relações (orquidário e suas reproduções)
     * Útil para validações complexas
     */
    async findByIdWithRelations(id: number): Promise<ReproducaoFlorOrmEntity | null> {
        return await this.repo.findOne({
            where: { id },
            relations: ['orquidario', 'orquidario.reproducoes']
        });
    }

    async delete(id: number): Promise<ReproducaoFlor | null> {
        const reproducao = await this.repo.findOneBy({ id });
        if (!reproducao)
            throw new HttpException("Reprodução não encontrada para deletar", HttpStatus.NOT_FOUND);
        await this.repo.delete(reproducao);
        return this.toDomain(reproducao);
    }

    /**
     * Trata erros de banco de dados e lança exceções apropriadas
     */
    private handleDatabaseError(error: any, reproducaoFlor: ReproducaoFlor): void {
        if (error instanceof QueryFailedError) {
            // MySQL: ER_DUP_ENTRY, PostgreSQL: 23505, SQLite: UNIQUE constraint failed
            const errorCode = (error as any).code || error.driverError?.code || '';
            const errorMessage = error.message || '';
            
            const isDuplicateError = 
                errorCode === 'ER_DUP_ENTRY' || 
                errorCode === '23505' || 
                errorCode === 'SQLITE_CONSTRAINT' ||
                errorMessage.includes('UNIQUE constraint failed') ||
                errorMessage.includes('Duplicate entry');

            if (isDuplicateError && errorMessage.includes('hibridoNome')) {
                throw new HibridoNomeAlreadyExists(reproducaoFlor.hibridoNome, reproducaoFlor.orquidarioId);
            }
        }
    }

    private toDomain = (orm: ReproducaoFlorOrmEntity): ReproducaoFlor => {
        return new ReproducaoFlor(orm.id, orm.orquidarioId, orm.hibridoNome, orm.dataGerminacao, orm.viavel, Number(orm.taxaSucessoPct));
    }
}