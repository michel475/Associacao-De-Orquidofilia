import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { OrquidarioNotFoundException } from '../../modules/orquidario/domain/orquidario-not-found.exception';
import { HibridoNomeAlreadyExists } from '../../modules/reproducaoFlor/domain/hibridoNome-already-exists.exception';
import { InvalidDataCriacaoOrquidario } from '../../modules/orquidario/domain/invalid-dataCriacao.exception';
import { InvalidAreaMQuadradoOrquidario } from '../../modules/orquidario/domain/area-M-quadradosOrquidario.exception';;
import { InvalidRangeTaxaSucessoPct } from '../../modules/reproducaoFlor/domain/taxaSucesso-invalid-range.exception';
import { InvalidTaxaSucessoPctViabilidade } from '../../modules/reproducaoFlor/domain/taxaSucesso-invalid-range-viability.exception';
import { InvalidPayload } from "../../utils/invalid-payload.exception";
import { ReproducaoFlorNotFoundException } from 'src/modules/reproducaoFlor/domain/reproducaoFlor-not-found.exception';
import { InvalidDataGerminacao } from 'src/modules/reproducaoFlor/domain/invalid-dataGerminacao-exception';


export interface ErrorDetail {
    campo?: string;
    code: string;
    description: string;
}

export interface ErrorResponse {
    status: number;
    message: string;
    error: string;
    detail: ErrorDetail[];
}

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AppExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const errorResponse = this.resolveException(exception);

        this.logger.error(
            `${request.method} ${request.url} → ${errorResponse.status}`,
            exception instanceof Error ? exception.stack : String(exception),
        );

        response.status(errorResponse.status).json(errorResponse);
    }

    private handleOrquidarioNotFound(exception: OrquidarioNotFoundException): ErrorResponse {
        return {
            status: HttpStatus.NOT_FOUND,
            message: 'Orquidário não encontrado',
            error: 'ORQUIDARIO_NOT_FOUND',
            detail: [
                {
                    campo: 'orquidarioId',
                    code: 'ORQUIDARIO_NOT_FOUND',
                    description: exception.message,
                },
            ],
        };
    }

    private handleReproducaoNotFound(exception: ReproducaoFlorNotFoundException): ErrorResponse {
        return {
            status: HttpStatus.NOT_FOUND,
            message: 'Reprodução não encontrada',
            error: 'REPRODUCAO_NOT_FOUND',
            detail: [
                {
                    campo: 'id',
                    code: 'REPRODUCAO_NOT_FOUND',
                    description: exception.message,
                }
            ]
        }
    }

    private handleHibridoNomeAlreadyExists(exception: HibridoNomeAlreadyExists): ErrorResponse {
        const msg =
            typeof exception.getResponse() === 'string'
                ? (exception.getResponse() as string)
                : exception.message;

        return {
            status: HttpStatus.CONFLICT,
            message: 'Hibrido nome já cadastrado no sistema',
            error: 'HIBRIDO_NOME_ALREADY_EXISTS',
            detail: [
                {
                    campo: 'hibridoNome',
                    code: 'HIBRIDO_NOME_ALREADY_EXISTS',
                    description: msg,
                },
            ],
        };
    }

     private handleDataCriacao(exception: InvalidDataCriacaoOrquidario): ErrorResponse {
         const msg =
             typeof exception.getResponse() === 'string'
                 ? (exception.getResponse() as string)
                 : exception.message;
         return {
             status: HttpStatus.BAD_REQUEST,
             message: 'Data criação inválida',
             error: 'INVALID_DATA_CRIACAO',
             detail: [
                 {
                     campo: 'dataCriacao',
                     code: 'INVALID_DATA_CRIACAO',
                     description: msg,
                 },
             ],
         };
    }

    private handleAreaMQuadradoOrquidario(exception: InvalidAreaMQuadradoOrquidario): ErrorResponse {
        const msg =
            typeof exception.getResponse() === 'string'
                ? (exception.getResponse() as string)
                : exception.message;
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Área inválida para orquidário',
            error: 'INVALID_AREA_ORQUIDARIO',
            detail: [
                {
                    campo: 'areaMquadrados',
                    code: 'INVALID_AREA_ORQUIDARIO',
                    description: msg,
                },
            ],
        };
    }

    private handleTaxaSucessoPctReproducaoFlorRange(exception: InvalidRangeTaxaSucessoPct): ErrorResponse {
        const msg =
            typeof exception.getResponse() === 'string'
                ? (exception.getResponse() as string)
                : exception.message;
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Porcentagem informada não é válida',
            error: 'INVALID_TAXA_SUCESSO_PCT',
            detail: [
                {
                    campo: 'taxaSucessoPct',
                    code: 'INVALID_TAXA_SUCESSO_PCT',
                    description: msg,
                },
            ],
        };
    }

    private handleTaxaSucessoPctReproducaoFlorViavel(exception: InvalidTaxaSucessoPctViabilidade): ErrorResponse {
        const msg =
            typeof exception.getResponse() === 'string'
                ? (exception.getResponse() as string)
                : exception.message;
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Faixa de porcentagem não é válida para viabilidade',
            error: 'INVALID_TAXA_SUCESSO_PCT',
            detail: [
                {
                    campo: 'taxaSucessoPct',
                    code: 'INVALID_TAXA_SUCESSO_PCT',
                    description: msg,
                },
            ],
        };
    }

    private handleDataGerminacao(exception: InvalidDataGerminacao): ErrorResponse {
        const msg =
            typeof exception.getResponse() === 'string'
                ? (exception.getResponse() as string)
                : exception.message;
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'A data de germinação não pode ser inferior à data de criação do orquidário',
            error: 'INVALID_DATA_GERMINACAO_REPRODUCAO',
            detail: [
                {
                    code: 'INVALID_DATA_GERMINACAO_REPRODUCAO',
                    description: msg,
                },
            ],
        };
    }

    private handleCamposObrigatorios(exception: InvalidPayload): ErrorResponse {
        const msg =
            typeof exception.getResponse() === 'string'
                ? (exception.getResponse() as string)
                : exception.message;
        return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Todos os campos devem obrigatoriamente ser informados',
            error: 'INVALID_PAYLOAD',
            detail: [
                {
                    code: 'INVALID_PAYLOAD',
                    description: msg,
                },
            ],
        };

    }

    private handleUnknown(exception: unknown): ErrorResponse {
        const message =
            exception instanceof Error ? exception.message : 'Erro interno do servidor';

        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Erro interno do servidor',
            error: 'INTERNAL_SERVER_ERROR',
            detail: [
                {
                    code: 'INTERNAL_SERVER_ERROR',
                    description: message,
                },
            ],
        };
    }

    private resolveException(exception: unknown): ErrorResponse {
        if (exception instanceof OrquidarioNotFoundException) {
            return this.handleOrquidarioNotFound(exception);
        }

        if (exception instanceof HibridoNomeAlreadyExists) {
            return this.handleHibridoNomeAlreadyExists(exception);
        }

        if (exception instanceof InvalidDataCriacaoOrquidario) {
            return this.handleDataCriacao(exception);
        }

        if (exception instanceof InvalidAreaMQuadradoOrquidario) {
            return this.handleAreaMQuadradoOrquidario(exception);
        }

        if (exception instanceof InvalidRangeTaxaSucessoPct) {
            return this.handleTaxaSucessoPctReproducaoFlorRange(exception);
        }

        if (exception instanceof InvalidTaxaSucessoPctViabilidade) {
            return this.handleTaxaSucessoPctReproducaoFlorViavel(exception);
        }

        if (exception instanceof InvalidPayload) {
            return this.handleCamposObrigatorios(exception);
        }

        if (exception instanceof ReproducaoFlorNotFoundException) {
            return this.handleReproducaoNotFound(exception);
        }

        if (exception instanceof InvalidDataGerminacao) {
            return this.handleDataGerminacao(exception);
        }

        // Capturar erros de banco de dados
        if (exception instanceof QueryFailedError) {
            return this.handleDatabaseError(exception);
        }

        return this.handleUnknown(exception);
    }

    /**
     * Trata erros de banco de dados (constraints violadas, unique violations, etc)
     */
    private handleDatabaseError(exception: QueryFailedError): ErrorResponse {
        const errorCode = (exception as any).code || ((exception as any).driverError?.code) || '';
        const errorMessage = exception.message || '';

        const isDuplicateError = 
            errorCode === 'ER_DUP_ENTRY' || 
            errorCode === '23505' || 
            errorCode === 'SQLITE_CONSTRAINT' ||
            errorMessage.includes('UNIQUE constraint failed') ||
            errorMessage.includes('Duplicate entry');

        if (isDuplicateError) {
            // Tentar identificar qual campo causou a violação
            if (errorMessage.includes('hibridoNome')) {
                return {
                    status: HttpStatus.CONFLICT,
                    message: 'Conflito de dados',
                    error: 'DUPLICATE_HIBRIDONOME',
                    detail: [{
                        campo: 'hibridoNome',
                        code: 'UNIQUE_CONSTRAINT_VIOLATION',
                        description: 'Híbrido com este nome já existe para este orquidário'
                    }]
                };
            }

            // Erro genérico de duplicate
            return {
                status: HttpStatus.CONFLICT,
                message: 'Violação de constraint UNIQUE',
                error: 'UNIQUE_CONSTRAINT_VIOLATION',
                detail: [{
                    code: 'UNIQUE_CONSTRAINT_VIOLATION',
                    description: 'Um dos campos contém um valor que já existe no banco de dados'
                }]
            };
        }

        // Erro genérico de banco de dados
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Erro na operação do banco de dados',
            error: 'DATABASE_ERROR',
            detail: [{
                code: errorCode || 'UNKNOWN_DB_ERROR',
                description: errorMessage || 'Erro desconhecido no banco de dados'
            }]
        };
    }
}