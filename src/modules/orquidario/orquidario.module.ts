import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrquidarioController } from "./presentation/orquidario.controller";
import { OrquidarioService } from "./application/orquidario.service";
import { OrquidarioTypeOrmRepository } from "./infrastructure/persistence/typeorm/orquidario.typeorm.repository";
import { OrquidarioOrmEntity } from "./infrastructure/persistence/typeorm/orquidario.orm-entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrquidarioOrmEntity])],
    controllers: [OrquidarioController],
    providers:[
        OrquidarioService,
        {
            provide: 'OrquidarioRepositoryPort',
            useClass: OrquidarioTypeOrmRepository,
        },
    ],
})

export class OrquidarioModule{}
