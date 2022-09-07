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
import { Teacher } from "./teachers.entity";

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

  @ManyToMany(() => Teacher, { eager: true, onDelete: "CASCADE" })
  @JoinTable()
  teachers: Teacher[];

  @ManyToOne(() => School)
  school: School;
}
