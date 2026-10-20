import "reflect-metadata";

export const INJETAVEL_METADATA_KEY = Symbol("injetavel")

export interface InjetavelOpcoes {
    injetavel?: string;
}

export interface InjetavelMetadata extends Required<InjetavelOpcoes> {
    injetavelClasse: string;
}

export function Injetavel(injetavelOpcoes?: InjetavelOpcoes): ClassDecorator {
    
    return (target) => {
        const metadata: Omit<InjetavelMetadata, "injetavelClasse"> = {
            injetavel: injetavelOpcoes?.injetavel ?? target.name.toLowerCase()
        }

        const tabela = (Reflect.getOwnMetadata(INJETAVEL_METADATA_KEY, target) as Map<string, InjetavelMetadata> | undefined)
                    ?? new Map<string, InjetavelMetadata>();

        tabela.set(String(target), {
             ...metadata,
            injetavelClasse: String(target.name)
        })

        Reflect.defineMetadata(INJETAVEL_METADATA_KEY, metadata, target);
    }
}