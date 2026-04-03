import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orquidario } from "./orquidario.orm-entity";

@Injectable()
export class OrquidarioTypeOrmRepository implements OrquidarioRepositoryPort{
    constructor(
        @InjectRepository(OrquidarioOrmEntity)
        private readonly repo: Repository<OrquidarioOrmEntity>
    ){}

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