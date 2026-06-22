export class ReproducaoFlor {
    constructor(
        public readonly id: number | null,
        public orquidarioId: number,
        public hibridoNome: string,
        public dataGerminacao: Date,
        public viavel: boolean,
        public taxaSucessoPct: number,
    ) { }
}