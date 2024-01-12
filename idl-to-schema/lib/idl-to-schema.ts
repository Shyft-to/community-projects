import { Idl } from "@project-serum/anchor";
import { IdlField } from "@project-serum/anchor/dist/cjs/idl";

export const idlToDatabaseSchema = (idl: Idl) => {
  try {
    if (!idl.accounts?.length) {
      throw new Error("Idl does not contain any accounts");
    }
    const tableSchemas = idl.accounts.map((accountDef) => {
      return createTableSchemaFromIdl(idl, accountDef.name);
    });

    return { accountCount: tableSchemas.length, sql: tableSchemas.join("\n") };
  } catch (error) {
    console.error(error);
    throw error
  }
};

const createTableSchemaFromIdl = (idl: Idl, accountName: string) => {
  const accountLayout = idl.accounts!.find(
    (account) => account.name === accountName
  );

  if (!accountLayout) {
    throw new Error(`Cannot find account layout, ${accountName}`);
  }

  const fields: TableField[] = accountLayout.type.fields.map((field) =>
    getColumnType(field)
  );

  fields.push(
    {
      name: "pubkey",
      type: "varchar",
      primaryKey: true,
    },
    {
      name: "_lamports",
      type: "numeric",
      nullable: false,
    }
  );

  return convertTableMappinsToSchema(accountName, fields);
};

export type TableField = {
  name: string;
  type: string;
  nullable?: boolean;
  primaryKey?: boolean;
  isArray?: boolean;
};

type IdlFields =
  | "u8"
  | "u16"
  | "u32"
  | "u64"
  | "u128"
  | "u256"
  | "i8"
  | "i16"
  | "i32"
  | "i64"
  | "i128"
  | "i256"
  | "f32"
  | "f64"
  | "f128"
  | "publicKey"
  | "bool"
  | "string"
  | "bytes";

const IDL_TO_DB_COLUMN: Record<IdlFields, string> = {
  u8: "numeric",
  u16: "numeric",
  u32: "numeric",
  u64: "numeric",
  u128: "numeric",
  u256: "numeric",
  i8: "numeric",
  i16: "numeric",
  i32: "numeric",
  i64: "numeric",
  i128: "numeric",
  i256: "numeric",
  f32: "numeric",
  f64: "numeric",
  f128: "numeric",
  publicKey: "varchar",
  bool: "bool",
  string: "varchar",
  bytes: "bytea",
};

export function getColumnType(field: IdlField): TableField {
  if (typeof field.type === "object") {
    if ("option" in field.type) {
      const type = getColumnType({ name: field.name, type: field.type.option });
      return { nullable: true, ...type };
    } else if ("vec" in field.type) {
      const type = getColumnType({ name: field.name, type: field.type.vec });
      return { isArray: true, ...type };
    } else if ("array" in field.type) {
      const type = getColumnType({
        name: field.name,
        type: field.type.array[0],
      });
      return { isArray: true, ...type };
    }
    if ("defined" in field.type) {
      return { name: field.name, type: "jsonb" };
    } else {
      throw new Error(
        `Column type schema not implemented yet. Field: ${JSON.stringify(
          field
        )}`
      );
    }
  }

  const type = IDL_TO_DB_COLUMN[field.type];
  if (!type) {
    throw new Error(`Unknown idl field type ${field.type}`);
  }

  return {
    name: field.name,
    type,
  };
}

function getColumnSpec(field: TableField): string {
  return [
    `"${field.name}"`,
    field.type,
    field.isArray ? "ARRAY" : "",
    field.primaryKey ? "PRIMARY KEY" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function convertTableMappinsToSchema(
  tableName: string,
  columns: TableField[]
): string {
  const ddlCreate = `CREATE TABLE "${tableName}" (\n\t${columns
    .map((f) => getColumnSpec(f))
    .join(",\n\t")}\n);\n`;

  return ddlCreate;
}
