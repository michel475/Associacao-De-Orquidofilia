import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger"
import { CreateOrquidarioDTO } from "./dto/create-orquidario.dto";
import { OrquidarioService } from "../application/orquidario.service";

@ApiTags('Orquidario')
@Controller('orquidario')
export class OrquidarioController{
    constructor(private readonly orquidarioSevice: OrquidarioService){}


    @Post()
    @ApiOperation({summary: 'Cria orquidário'})
    create(@Body() dto: CreateOrquidarioDTO){
        return this.orquidarioSevice.create(dto.id, dto.enderecoOrquidario, dto.dataCriacao, dto.irrigadoAuto, dto.areaMquadrados)
    };

    @Get()
    @ApiOperation({ summary: 'Lista todos os orquidários' })
    findAll() {
        return this.orquidarioSevice.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca um orquidário por ID' })
    @ApiParam({ name: 'id', type: Number, example: 1 })
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.orquidarioSevice.findById(id);
    }
}
