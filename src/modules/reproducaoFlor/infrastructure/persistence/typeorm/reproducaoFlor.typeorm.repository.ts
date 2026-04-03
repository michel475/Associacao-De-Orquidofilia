import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { ReproducaoFlorRepositoryPort } from "src/modules/reproducaoFlor/application/ports/reproducaoFlor.repository.port";
import { ReproducaoFlorOrmEntity } from "./reproducaoFlor.orm-entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ReproducaoFlor } from "src/modules/reproducaoFlor/domain/reproducaoFlor";


@Injectable()
export class ReproducaoFlorTypeOrmRepository implements ReproducaoFlorRepositoryPort {
    constructor(
        @InjectRepository(ReproducaoFlorOrmEntity)
        private readonly repo: Repository<ReproducaoFlorOrmEntity>,
    ) { }

    async create(reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor> {
        const orm = this.repo.create({
            orquidarioId: reproducaoFlor.orquidarioId,
            hibridoNome: reproducaoFlor.hibridoNome,
            dataGerminacao: reproducaoFlor.dataGerminacao,
            viavel: reproducaoFlor.viavel,
            taxaSucessoPct: reproducaoFlor.taxaSucessoPct,
        })
        const saved = await this.repo.save(orm);
        try {
            return this.toDomain(saved);
        } catch (error) {
            throw new HttpException("Erro na criação de reprodução flor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor> {
        const id = reproducaoFlor.id;
        if (!id)
            throw new Error("pode nao man");
        const reproducao = await this.repo.findOneBy({ id });
        const reproducaoFlorUpdates = {
            orquidarioId: reproducaoFlor.orquidarioId,
            hibridoNome: reproducaoFlor.hibridoNome,
            dataGerminacao: reproducaoFlor.dataGerminacao,
            viavel: reproducaoFlor.viavel,
            taxaSucessoPct: reproducaoFlor.taxaSucessoPct,
        }

        const saved = await this.repo.save(reproducaoFlorUpdates);
        try {
            return this.toDomain(saved);
        } catch (error) {
            throw new HttpException("Erro ao atualizar registro de reprodução de flor", HttpStatus.INTERNAL_SERVER_ERROR);
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

    async delete(id: number): Promise<ReproducaoFlor | null> {
        const reproducao = await this.repo.findOneBy({ id });
        if (!reproducao)
            throw new HttpException("Reprodução não encontrada para deletar", HttpStatus.NOT_FOUND);
        await this.repo.delete(reproducao);
        return reproducao;
    }

    private toDomain = (orm: ReproducaoFlorOrmEntity): ReproducaoFlor => {
        return new ReproducaoFlor(orm.id, orm.orquidarioId, orm.hibridoNome, orm.dataGerminacao, orm.viavel, orm.taxaSucessoPct);
    }
}