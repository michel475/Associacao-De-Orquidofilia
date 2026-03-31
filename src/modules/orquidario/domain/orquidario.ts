export class Orquidario {
    constructor(
        public readonly id: number,
        public endereco: string,
        public dataCriacao: Date,
        public irrigadoAuto: boolean,
        public areaMquadrados: number,
    ) { }
}