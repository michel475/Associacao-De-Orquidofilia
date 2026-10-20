import "reflect-metadata";

export const INJETAR_METADATA_KEY = Symbol("injetar")

export interface InjetarOpcoes {
    injetar?: string;
}

export interface InjetarMetadata extends Required<InjetarOpcoes> {
    constructorInjection: string;
}

export function Tabela(tabelaOpcoes?: InjetarOpcoes): ClassDecorator {
    
    return (target) => {
        const metadata: Omit<InjetarMetadata, "constructorInjection"> = {
            injetar: tabelaOpcoes?.injetar ?? target.name.toLowerCase()
        }

        const tabela = (Reflect.getOwnMetadata(INJETAR_METADATA_KEY, target) as Map<string, InjetarMetadata> | undefined)
                    ?? new Map<string, InjetarMetadata>();

        tabela.set(String(target), {
             ...metadata,
            constructorInjection: String(target.name)
        })

        Reflect.defineMetadata(INJETAR_METADATA_KEY, metadata, target);
    }
}