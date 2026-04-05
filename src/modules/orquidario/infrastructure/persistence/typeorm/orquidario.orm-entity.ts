import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ReproducaoFlorOrmEntity } from 'src/modules/reproducaoFlor/infrastructure/persistence/typeorm/reproducaoFlor.orm-entity.js';

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

    @OneToMany(() => ReproducaoFlorOrmEntity, (reproducao) => reproducao.orquidario)
    reproducoes: ReproducaoFlorOrmEntity[];
}