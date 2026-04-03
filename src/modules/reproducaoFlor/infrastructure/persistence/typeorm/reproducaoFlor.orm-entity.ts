import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('reproducaoFlor')
export class ReproducaoFlorOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orquidarioId: number;

    @Column()
}
