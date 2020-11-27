import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  encryptedPrivateKey: string;

  @Column()
  publicKey: string;

  @Column()
  isAdmin: number;

  @Column()
  storedPassword: string;
}
