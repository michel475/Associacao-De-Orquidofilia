import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReproducaoFlorOrmEntity } from '../../../../reproducaoFlor/infrastructure/persistence/typeorm/reproducaoFlor.orm-entity'
import { Tabela } from 'src/shared/database/decorators/tabela-dec';
import { Campo } from 'src/shared/database/decorators/campo-dec';
import { SuperTabela } from 'src/shared/database/superTabela';

@Tabela({tableName: 'orquidario'})
export class OrquidarioOrmEntity extends SuperTabela<number>{
    constructor(id: number, endereco: string, dataCriacao: Date, irrigadoAuto: boolean, areaMquadrados: number)
    {
        super();
        this.endereco = endereco;
        this.dataCriacao = dataCriacao;
        this.irrigadoAuto = irrigadoAuto;
        this.areaMquadrados = areaMquadrados
    }
    @Campo({colunaNome: 'id', isPk: true, isObrigatorio: true})
    private id: number = 0;

    @Campo({colunaNome: 'endereco', isPk: false, isObrigatorio: true})
    private endereco: string = '';

    @Campo({colunaNome: 'dataCriacao', isPk:false, isObrigatorio:true})
    private dataCriacao: Date = new Date();

    @Campo({colunaNome: 'irrigadoAuto', isObrigatorio: true})
    private irrigadoAuto: boolean = false;

    @Campo({colunaNome: 'areaMquadrados', isObrigatorio: true})
    private areaMquadrados: number = 0;

    @OneToMany(() => ReproducaoFlorOrmEntity, (reproducao) => reproducao.orquidario)
    private reproducoes: ReproducaoFlorOrmEntity[];
}