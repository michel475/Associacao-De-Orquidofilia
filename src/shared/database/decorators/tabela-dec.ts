import "reflect-metadata";

export const TABELA_METADATA_KEY = Symbol("tabela")

export interface TabelaOpcoes {
    tableName?: string;
}

export interface TabelaMetadata extends Required<TabelaOpcoes> {
    className: string;
}

export function Tabela(tabelaOpcoes?: TabelaOpcoes): ClassDecorator {
    
    return (target) => {
        const metadata: Omit<TabelaMetadata, "className"> = {
            tableName: tabelaOpcoes?.tableName ?? target.name.toLowerCase()
        }

        const tabela = (Reflect.getOwnMetadata(TABELA_METADATA_KEY, target) as Map<string, TabelaMetadata> | undefined)
                    ?? new Map<string, TabelaMetadata>();

        tabela.set(String(target), {
             ...metadata,
            className: String(target.name)
        })

        Reflect.defineMetadata(TABELA_METADATA_KEY, metadata, target);
    }
}