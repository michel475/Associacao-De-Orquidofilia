import "reflect-metadata";

export const TABELA_METADATA_KEY = Symbol("tabela")

export interface TabelaOpcoes {
    tableName?: string;
}

export interface TabelaMetadata {
    tableName: string;
}

export function Tabela(tabelaOpcoes?: TabelaOpcoes): ClassDecorator {
    return (target) => {
        const tableName = tabelaOpcoes?.tableName ?? target.name.toLowerCase();
        if (!tableName.trim()) {
            throw new Error(`O decorator @Tabela exige um nome de tabela válido: ${target.name}.`);
        }

        const metadata: TabelaMetadata = { tableName };
        Reflect.defineMetadata(TABELA_METADATA_KEY, metadata, target);
    };
}