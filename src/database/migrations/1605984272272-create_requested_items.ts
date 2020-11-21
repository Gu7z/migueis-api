import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRequestedItems1605984272272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "requested_items",
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
            name: "product_id",
            type: "number",
          },
          {
            name: "quantity",
            type: "number",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "request_id",
            type: "number",
          },
        ],
        foreignKeys: [
          {
            name: "RequestedProduct",
            columnNames: ["product_id"],
            referencedTableName: "products",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          {
            name: "RequestId",
            columnNames: ["request_id"],
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
    await queryRunner.dropTable("requested_items");
  }
}
