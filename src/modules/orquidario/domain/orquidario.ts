export class Orquidario {
    constructor(
        public readonly id: number,
        public endereco: string,
        public readonly dataCriacao: Date,
        public irrigadoAuto: boolean,
        public areaMquadrados: number,
    ) {}
}