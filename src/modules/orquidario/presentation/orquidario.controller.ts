import { Controller,Post, Get, Delete, Patch, Body, Put, Param } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger"
import { CreateOrquidarioDTO } from "./dto/create-orquidario.dto";
import { OrquidarioService } from "../application/orquidario.service";
import { UpdateOrquidarioDTO } from "./dto/update-orquidario.dto";
import { identity } from "rxjs";

@ApiTags('Orquidario')
@Controller('orquidario')
export class OrquidarioController{
    constructor(private readonly orquidarioSevice: OrquidarioService){}


    @Post()
    @ApiOperation({summary: 'Cria orquidário'})
    create(@Body() dto: CreateOrquidarioDTO){
        return this.orquidarioSevice.create(dto.enderecoOrquidario, dto.dataCriacao, dto.irrigadoAuto, dto.areaMquadrados)
    };

    @Get()
    @ApiOperation({summary: 'Lista orquidários'})
    findAll(){
        return this.orquidarioSevice.findAll();
    }

    @Get(':id')
    @ApiParam({name: 'id', example: 1})
    @ApiOperation({summary: 'Busca orquidário por ID'})
    findById(@Param('id') id: string){
        return this.orquidarioSevice.findById(Number(id));
    }

    @Put(':id')
    @ApiParam({name: 'id', example: 1})
    @ApiOperation({summary:  'Edita os dados de um orquidário'})
    update(@Param('id') id: string, @Body() dto: UpdateOrquidarioDTO){
        return this.orquidarioSevice.update(Number(id),dto.endereco, dto.dataCriacao, dto.irrigadoAuto, dto.areaMquadrados)
    }

    @Delete('delete/:id')
    @ApiParam({name: 'id', example: 1})
    @ApiOperation({summary: 'Deleta um orquidário através do id'})
    delete(@Param('id') id: string){
        return this.orquidarioSevice.delete(Number(id))
    }
    
    @Get('/reproducoes/:id')
    @ApiOperation({summary:'Lista todas as reproduções de um orquidário'})
    listarReproducoes(@Param('id') id: string){
        return this.orquidarioSevice.listarReproducoes(Number(id))
    }
}
