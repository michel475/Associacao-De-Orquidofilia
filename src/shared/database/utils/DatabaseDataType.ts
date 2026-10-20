export enum DatabaseDataType {
    INTEGER = "INTEGER",
    DOUBLE = "DOUBLE",
    VARCHAR = "VARCHAR",
    TEXT = "TEXT",
    TIMESTAMP = "TIMESTAMP",
    BOOLEAN = "BOOLEAN"
}

export const databaseDataTypeByType = new Map<Function, DatabaseDataType>([
  [String, DatabaseDataType.VARCHAR],
  [Number, DatabaseDataType.INTEGER],
  [Boolean, DatabaseDataType.BOOLEAN],
  [Date, DatabaseDataType.TIMESTAMP],
]);

export const normalizeData = (
    value: unknown,
    dataType: DatabaseDataType,
): unknown => {
    if (value === null) {
        return null;
    }

      switch (dataType) {
          case DatabaseDataType.INTEGER:
              if (typeof value === "number" && Number.isSafeInteger(value)) {
                  return value;
              }
              break;
          case DatabaseDataType.DOUBLE:
              if (typeof value === "number" && Number.isFinite(value)) {
                  return value;
              }
              break;
          case DatabaseDataType.VARCHAR:
          case DatabaseDataType.TEXT:
              if (typeof value === "string") {
                  return value;
              }
              break;
          case DatabaseDataType.BOOLEAN:
              if (typeof value === "boolean") {
                  return value;
              }
              break;
          case DatabaseDataType.TIMESTAMP:
              if (value instanceof Date && !Number.isNaN(value.getTime())) {
                  return value.toISOString();
              }
              break;
      }

      throw new Error(
          `Valor incompatível com o tipo de dado ${dataType}.`,
      );
};