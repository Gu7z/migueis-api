import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProducts1603769171736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = new Table({
      name: "products",
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
          name: "name",
          type: "varchar",
        },
        {
          name: "description",
          type: "varchar",
        },
        {
          name: "price",
          type: "decimal",
          scale: 10,
          precision: 2,
        },
        {
          name: "quantity",
          type: "integer",
        },
        {
          name: "category_id",
          type: "integer",
        },
      ],
      foreignKeys: [
        {
          name: "CategoryProduct",
          columnNames: ["category_id"],
          referencedTableName: "categorys",
          referencedColumnNames: ["id"],
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      ],
    });

    await queryRunner.createTable(data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
