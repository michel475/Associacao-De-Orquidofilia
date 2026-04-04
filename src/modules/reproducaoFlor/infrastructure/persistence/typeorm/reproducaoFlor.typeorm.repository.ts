import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { ReproducaoFlorRepositoryPort } from "src/modules/reproducaoFlor/application/ports/reproducaoFlor.repository.port";
import { ReproducaoFlorOrmEntity } from "./reproducaoFlor.orm-entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ReproducaoFlor } from "src/modules/reproducaoFlor/domain/reproducaoFlor";
import { ReproducaoFlorNotFoundException } from "src/modules/reproducaoFlor/domain/reproducaoFlor-not-found.exception";


@Injectable()
export class ReproducaoFlorTypeOrmRepository implements ReproducaoFlorRepositoryPort {
    constructor(
        @InjectRepository(ReproducaoFlorOrmEntity)
        private readonly repo: Repository<ReproducaoFlorOrmEntity>,
    ) { }

    async create(reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor> {
        const orm = this.repo.create({
            orquidario: { id: reproducaoFlor.orquidarioId },
            hibridoNome: reproducaoFlor.hibridoNome,
            dataGerminacao: reproducaoFlor.dataGerminacao,
            viavel: reproducaoFlor.viavel,
            taxaSucessoPct: reproducaoFlor.taxaSucessoPct,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async update(id: number, reproducaoFlor: ReproducaoFlor): Promise<ReproducaoFlor> {
        const reproducao = await this.repo.findOneBy({ id });
        if (!reproducao) throw new ReproducaoFlorNotFoundException(id);

        reproducao.hibridoNome = reproducaoFlor.hibridoNome
        reproducao.dataGerminacao = reproducaoFlor.dataGerminacao
        reproducao.viavel = reproducaoFlor.viavel
        reproducao.taxaSucessoPct = reproducaoFlor.taxaSucessoPct

        const saved = await this.repo.save(reproducao);
        return this.toDomain(saved);
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
        return this.toDomain(reproducao);
    }

    private toDomain = (orm: ReproducaoFlorOrmEntity): ReproducaoFlor => {
        return new ReproducaoFlor(orm.id, orm.orquidario.id, orm.hibridoNome, orm.dataGerminacao, orm.viavel, Number(orm.taxaSucessoPct));
    }
}