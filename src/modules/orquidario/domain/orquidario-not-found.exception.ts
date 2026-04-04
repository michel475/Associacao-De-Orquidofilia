export class OrquidarioNotFoundException extends Error {
    constructor(id: number) {
        super(`Orquidário com id ${id} não foi encontrado`);
        this.name = 'OrquidarioNotFoundException';
        Object.setPrototypeOf(this, OrquidarioNotFoundException.prototype);
    }
}