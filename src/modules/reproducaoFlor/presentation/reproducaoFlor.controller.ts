import { CreateReproducaoFlorDTO } from "./dto/create-reproducaoFlor.dto";
import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ReproducaoFlorService } from "../application/reproducaoFlor.service";

@ApiTags('ReproducaoFlor')
@Controller('reproducaoFlor')
export class ReproducaoFlorController {
    constructor(private readonly reproducaoFlorService: ReproducaoFlorService) { }

    @Post()
    @ApiOperation({ summary: "Insere uma nova reproducaoflor" })
    create(@Body() dto: CreateReproducaoFlorDTO) {
        return this.reproducaoFlorService.create(Number(dto.orquidarioId), dto.hibridoNome, dto.dataGerminacao, dto.viavel, Number(dto.taxaSucessoPct));
    }

    @Get()
    @ApiOperation({ summary: 'Lista todas as reproduções' })
    findAll() {
        return this.reproducaoFlorService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca uma reprodução por ID' })
    @ApiParam({ name: 'id', type: Number, example: 1 })
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.reproducaoFlorService.findById(String(id));
    }
}