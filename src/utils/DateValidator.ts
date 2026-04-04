export class DateValidator {
    constructor(public validarData: Date) {
        this.validarData = validarData;
    }

    public isDate() {
        const type = typeof this.validarData;
        return type === typeof Date;
    }
}