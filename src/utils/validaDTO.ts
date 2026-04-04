import { CreateReproducaoFlorDTO } from "src/modules/reproducaoFlor/presentation/dto/create-reproducaoFlor.dto";
import { UpdateReproducaoFlorDTO } from "src/modules/reproducaoFlor/presentation/dto/update-reproducaoFlor.dto";

export class ValidaDTO {
    constructor() { }

    public validaPayload(dto: CreateReproducaoFlorDTO | UpdateReproducaoFlorDTO): boolean {
        if (dto instanceof CreateReproducaoFlorDTO)
            if (!dto.dataGerminacao || !dto.hibridoNome || !dto.orquidarioId || !dto.taxaSucessoPct || !dto.viavel)
                return true;
        if (dto instanceof UpdateReproducaoFlorDTO)
            if (!dto.id || !dto.dataGerminacao || !dto.hibridoNome || !dto.orquidarioId || !dto.taxaSucessoPct || !dto.viavel)
                return true;
        return false;
    }
}