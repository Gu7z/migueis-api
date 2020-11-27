import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class linkUserToOrder1606358466522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "user_id",
        type: "number",
        isNullable: true,
      })
    );

    const foreingKey = new TableForeignKey({
      name: "UserOrder",
      columnNames: ["user_id"],
      referencedTableName: "users",
      referencedColumnNames: ["id"],
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryRunner.createForeignKey("orders", foreingKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("orders", "user_id");
    await queryRunner.dropForeignKey("orders", "UserOrder");
  }
}
