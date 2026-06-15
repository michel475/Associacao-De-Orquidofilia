import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ReproducaoFlorOrmEntity } from '../../../../reproducaoFlor/infrastructure/persistence/typeorm/reproducaoFlor.orm-entity'

@Entity('orquidario')
export class OrquidarioOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
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