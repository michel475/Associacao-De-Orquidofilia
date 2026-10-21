import { Inject } from '@nestjs/common';
import 'reflect-metadata';

export const INJETAR_METADATA_KEY = Symbol('injetar');

export type InjectableEntity = abstract new (...args: never[]) => object;

export function getEntityRepositoryToken(
  entity: InjectableEntity,
): InjectableEntity {
  return entity;
}

export function Injetar(entity: InjectableEntity): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    Inject(getEntityRepositoryToken(entity))(
      target,
      propertyKey,
      parameterIndex,
    );
    Reflect.defineMetadata(
      INJETAR_METADATA_KEY,
      entity,
      target,
      `constructor:${parameterIndex}`,
    );
  };
}
