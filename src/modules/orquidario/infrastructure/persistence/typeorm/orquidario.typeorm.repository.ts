import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrquidarioOrmEntity } from "./orquidario.orm-entity";
import { Repository } from 'typeorm';
import { Orquidario } from "src/modules/orquidario/domain/orquidario";
import { OrquidarioRepositoryPort } from "src/modules/orquidario/application/ports/orquidario.repository.port";
import { OrquidarioNotFoundException } from "src/modules/orquidario/domain/orquidario-not-found.exception";

@Injectable()
export class OrquidarioTypeOrmRepository implements OrquidarioRepositoryPort{
    constructor(
        @InjectRepository(OrquidarioOrmEntity)
        private readonly repo: Repository<OrquidarioOrmEntity>
    ){}

    async create(orquidario: Orquidario): Promise<Orquidario> {
        const orm = this.repo.create({
            endereco: orquidario.endereco,
            dataCriacao: orquidario.dataCriacao,
            irrigadoAuto: orquidario.irrigadoAuto,
            areaMquadrados: orquidario.areaMquadrados
        });
        const saved = await this.repo.save(orm)
        return this.toDomain(saved)
    }

    async update(id: number, orquidario: Orquidario): Promise<Orquidario | null> {
        const orm = await this.repo.findOneBy({id: id});
        if(!orm) return null;
        
        orm.endereco = orquidario.endereco;
        orm.dataCriacao = orquidario.dataCriacao;
        orm.irrigadoAuto = orquidario.irrigadoAuto;
        orm.areaMquadrados = orquidario.areaMquadrados;

        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async findAll(): Promise<Orquidario[] | null> {
        const itens = await this.repo.find({order: {id: 'DESC'}});
        return itens.map(this.toDomain);
    }

    async findById(id: number): Promise<Orquidario | null> {
        const item = await this.repo.findOneBy({id});
        return item ? this.toDomain(item) : null;
    }

    async delete(id: number): Promise<Orquidario | null> {
        const orm = await this.repo.findOneBy({id});
        if(!orm) return null;

        const deleteorquidario = this.toDomain(orm);
        await this.repo.delete({id});
        return deleteorquidario;
    }

    private toDomain = (orm: OrquidarioOrmEntity): Orquidario => {
        return new Orquidario(
            orm.id,
            orm.endereco,
            orm.dataCriacao,
            orm.irrigadoAuto,
            orm.areaMquadrados
        );
    };
}