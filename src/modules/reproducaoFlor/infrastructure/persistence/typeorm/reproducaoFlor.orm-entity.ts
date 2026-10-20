import { OrquidarioOrmEntity } from 'src/modules/orquidario/infrastructure/persistence/typeorm/orquidario.orm-entity';
import { Campo } from 'src/shared/database/decorators/campo-dec';
import { Tabela } from 'src/shared/database/decorators/tabela-dec';
import { SuperTabela } from 'src/shared/database/superTabela';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Tabela({tableName: 'reproducaoFlor'})
export class ReproducaoFlorOrmEntity extends SuperTabela<number>{
    constructor(id: number, orquidarioId: number, hibridoNome: string, dataGerminacao: Date, viavel: boolean, taxaSucessoPct: number) {
        super()
        this.id = id
        this.orquidarioId = orquidarioId;
        this.hibridoNome = hibridoNome;
        this.dataGerminacao = dataGerminacao;
        this.viavel = viavel;
        this.taxaSucessoPct = taxaSucessoPct;
    }
    
    @Campo({colunaNome: 'id', isPk: true, isObrigatorio: true})
    private id: number;

    @Campo({colunaNome: 'id', isPk: true, isObrigatorio: true})
    private orquidarioId: number;

    @ManyToOne(() => OrquidarioOrmEntity, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'orquidarioId' })
    orquidario: OrquidarioOrmEntity;

    @Campo({colunaNome: 'id', isPk: true, isObrigatorio: true})
    private hibridoNome: string;

    @Campo({colunaNome: 'id', isPk: true, isObrigatorio: true})
    private dataGerminacao: Date;

    @Campo({colunaNome: 'id', isPk: true, isObrigatorio: true})
    private viavel: boolean;

    @Campo({colunaNome: 'id', isPk: true, isObrigatorio: true})
    private taxaSucessoPct: number;
}
