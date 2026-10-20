import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ReproducaoFlorOrmEntity } from '../../../../reproducaoFlor/infrastructure/persistence/typeorm/reproducaoFlor.orm-entity'
import { Tabela } from 'src/shared/database/decorators/tabela-dec';
import { Campo } from 'src/shared/database/decorators/campo-dec';

@Tabela({tableName: 'orquidario'})
export class OrquidarioOrmEntity {
    constructor(id: number, endereco)
    @Campo({colunaNome: 'id', isPk: true, isObrigatorio: true})
    id: number;

    @Campo()
    endereco: string;

    @Column()
    dataCriacao: Date;

    @Column()
    irrigadoAuto: boolean;

    @Column()
    areaMquadrados: number;

    @OneToMany(() => ReproducaoFlorOrmEntity, (reproducao) => reproducao.orquidario)
    reproducoes: ReproducaoFlorOrmEntity[];
}