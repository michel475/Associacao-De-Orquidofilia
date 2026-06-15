export class Orquidario {
    constructor(
        public readonly id: number|null,
        public nome: string,
        public endereco: string,
        public dataCriacao: Date,
        public irrigadoAuto: boolean,
        public areaMquadrados: number,
    ) {}
}