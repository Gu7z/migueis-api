import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrders1605984104676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "value",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "items",
            type: "number",
          },
          { name: "table", type: "integer" },
        ],
        foreignKeys: [
          {
            name: "RequestId",
            columnNames: ["items"],
            referencedTableName: "requested_items_counter",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }
}
