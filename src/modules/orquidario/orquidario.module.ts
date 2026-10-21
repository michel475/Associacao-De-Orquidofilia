import { Module } from "@nestjs/common";
import { OrquidarioController } from "./presentation/orquidario.controller";
import { OrquidarioService } from "./application/orquidario.service";
import { OrquidarioRepository } from "./infrastructure/persistence/repositories/orquidario.repository";

@Module({
    controllers: [OrquidarioController],
    providers: [
        OrquidarioService,
        {
            provide: 'OrquidarioRepositoryPort',
            useClass: OrquidarioRepository,
        },
    ],
    exports: ['OrquidarioRepositoryPort']
})

export class OrquidarioModule { }
