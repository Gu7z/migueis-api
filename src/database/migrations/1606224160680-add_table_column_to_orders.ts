import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addTableColumnToOrders1606224160680 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "table",
        type: "integer",
        isNullable: false,
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("orders", "table");
  }
}
