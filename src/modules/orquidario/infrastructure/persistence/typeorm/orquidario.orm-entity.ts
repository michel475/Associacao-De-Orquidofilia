import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ReproducaoFlorOrmEntity } from '../../../../typeorm/reproducaoFlor.orm-entity.ts';

@Entity('orquidario')
export class OrquidarioOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    endereco: string;

    @Column()
    dataCriacao: Date;

    @Column()
    irrigadoAuto: boolean;

    @Column()
    areaMquadrados: number;

    @OneToMany(() => ReproducaoFlorOrmEntity (reproducao) => reproducao.orquidario)
    reproducoes: ReproducaoFlorOrmEntity[];
}