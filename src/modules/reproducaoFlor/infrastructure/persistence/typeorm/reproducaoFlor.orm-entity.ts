import { OrquidarioOrmEntity } from 'src/modules/orquidario/infrastructure/persistence/typeorm/orquidario.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('reproducaoFlor')
export class ReproducaoFlorOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orquidarioId: number;

    @ManyToOne(() => OrquidarioOrmEntity, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'orquidarioId' })
    orquidario: OrquidarioOrmEntity;

    @Column() //Lançar conflict exception
    hibridoNome: string;

    @Column()
    dataGerminacao: Date;

    @Column()//bad request se false e taxa sucesso maior que 30% ou se true e taxa sucesso menor que 70%
    viavel: boolean;

    @Column()
    taxaSucessoPct: number;
}
