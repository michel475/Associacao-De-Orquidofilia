export class ReproducaoFlorNotFoundException extends Error {
    constructor(id: number) {
        super(`Reprodução com id ${id} não foi encontrado`);
        this.name = 'ReproducaoFlorNotFoundException';
        Object.setPrototypeOf(this, ReproducaoFlorNotFoundException.prototype);
    }
}