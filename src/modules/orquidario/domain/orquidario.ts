export class Orquidario {
    constructor(
        public readonly id: number|null,
        public endereco: string,
        public readonly dataCriacao: Date,
        public irrigadoAuto: boolean,
        public areaMquadrados: number,
    ) {}
}