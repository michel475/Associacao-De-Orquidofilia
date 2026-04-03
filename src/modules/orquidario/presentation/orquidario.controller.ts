import { Controller,Post, Get, Delete, Patch, Body } from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger"
import { CreateOrquidarioDTO } from "./dto/create-orquidario.dto";

@ApiTags('Orquidario')
@Controller('orquidario')
export class orquidarioController{
    constructor(private readonly orquidarioSevice: OrquidarioService){}

    @Post()
    @ApiOperation()
    create(@Body() dto: CreateOrquidarioDTO){
        return this.orquidarioSevice.create(dto)
    }    
}
