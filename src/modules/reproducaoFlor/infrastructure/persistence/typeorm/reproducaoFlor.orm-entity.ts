import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('reproducaoFlor')
export class ReproducaoFlorOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrquidarioOrmEntity,)
    @JoinColumn({ name: 'orquidarioId' })
    orquidario: OrquidarioOrmEntity;

    @Column({ unique: true }) //Lançar conflict exception
    hibridoNome: string;

    @Column()
    dataGerminacao: Date;

    @Column()//bad request se false e taxa sucesso maior que 30% ou se true e taxa sucesso menor que 70%
    viavel: boolean;

    @Column()
    taxaSucessoPct: number;

<<<<<<< HEAD
    @Column()
=======
>>>>>>> 938bf10 (Mapeando entidades e começando validação de regras de negócio da entidade Reproducao Flor)
}
