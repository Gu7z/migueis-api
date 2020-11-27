import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserTable1606265168874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
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
            name: "email",
            type: "varchar",
          },
          {
            name: "storedPassword",
            type: "varchar",
          },
          {
            name: "encryptedPrivateKey",
            type: "varchar",
          },
          {
            name: "publicKey",
            type: "varchar",
          },
          {
            name: "isAdmin",
            type: "integer",
            default: 0,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
