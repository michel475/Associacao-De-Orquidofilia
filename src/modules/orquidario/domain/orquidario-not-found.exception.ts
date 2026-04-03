export class OrquidarioNotFoundException extends Error {
    constructor(id: number) {
        super(`Usuário com id ${id} não encontrado`);
        this.name = 'OrquidarioNotFoundException';
        Object.setPrototypeOf(this, OrquidarioNotFoundException.prototype);
    }
}