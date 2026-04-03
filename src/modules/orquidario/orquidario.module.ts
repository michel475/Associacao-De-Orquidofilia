import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { orquidarioController } from "./presentation/orquidario.controller";
import { OrquidarioService } from "./application/orquidario.service";


@Module({
    imports: [TypeOrmModule.forFeature([OrquidarioOrmEntity])],
    controllers: [orquidarioController],
    providers:[
        OrquidarioService,
        {
            provide: 'OrquidarioRepositoryPort',
            useClass: OrquidarioTypeOrmRepository,
        },
    ],
})

export class OrquidarioModule{}
