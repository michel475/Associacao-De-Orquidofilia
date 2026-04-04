import { CreateReproducaoFlorDTO } from "./dto/create-reproducaoFlor.dto";
import { Body, Param, Controller, Post, Patch, Get, Delete } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateReproducaoFlorDTO } from "./dto/update-reproducaoFlor.dto";
import { ReproducaoFlorService } from "../application/reproducaoFlor.service";
import { InvalidPayload } from "../../../utils/invalid-payload.exception";
import { ValidaDTO } from "../../../utils/validaDTO";

@ApiTags('ReproducaoFlor')
@Controller('reproducaoFlor')
export class ReproducaoFlorController {
    constructor(private readonly reproducaoFlorService: ReproducaoFlorService) { }

    @Post()
    @ApiOperation({ summary: "Insere uma nova reproducaoflor" })
    create(@Body() dto: CreateReproducaoFlorDTO) {
        const valida = new ValidaDTO();
        if (!valida) {
            throw new InvalidPayload(dto);
        }
        return this.reproducaoFlorService.create(dto.orquidarioId, dto.hibridoNome, dto.dataGerminacao, dto.viavel, dto.taxaSucessoPct);
    }

    @Patch('/update/:orquidarioId')
    @ApiOperation({ summary: "Atualiza uma instância de reproducao flor" })
    update(@Param('orquidarioId') orquidarioId: number, @Body() dto: UpdateReproducaoFlorDTO) {
        const valida = new ValidaDTO();
        if (!valida) {
            throw new InvalidPayload(dto);
        }
        return this.reproducaoFlorService.update(dto.id, orquidarioId, dto.hibridoNome, dto.dataGerminacao, dto.viavel, dto.taxaSucessoPct)
    }

    @Get('/listar')
    @ApiOperation({ summary: "Lista todas as instâncias de reproducao flor" })
    findAll() {
        return this.reproducaoFlorService.findAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: "Encontrar um pelo id" })
    findById(@Param('id') id: string) {
        return this.reproducaoFlorService.findById(Number(id))
    }

    @Delete('/deletar/:id')
    @ApiOperation({ summary: "deletar pelo id" })
    delete(@Param('id') id: string) {
        return this.reproducaoFlorService.delete(Number(id));
    }
}