import { Injectable } from '@nestjs/common';
import 'reflect-metadata';

export const INJETAVEL_METADATA_KEY = Symbol('injetavel');

export function Injetavel(): ClassDecorator {
  return (target) => {
    Injectable()(target);
    Reflect.defineMetadata(INJETAVEL_METADATA_KEY, true, target);
  };
}
