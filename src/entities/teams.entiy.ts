import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "./school.entity";
import { Student } from "./students.entity";

@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.team, {
    eager: true,
    onDelete: "CASCADE",
  })
  students: Student[];

  @ManyToOne(() => School, { onDelete: "CASCADE" })
  school: School;
}
