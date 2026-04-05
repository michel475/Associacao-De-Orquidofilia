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

<<<<<<< HEAD
    @OneToMany(() => ReproducaoFlorOrmEntity (reproducao) => reproducao.orquidario)
=======
    @OneToMany(() => ReproducaoFlorOrmEntity, (reproducao) => reproducao.orquidario)
>>>>>>> 1f2c57c (alterações necessárias em validação da data e orquidario-orm)
    reproducoes: ReproducaoFlorOrmEntity[];
}