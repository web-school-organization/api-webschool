import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from "typeorm";
import { Feedback } from "./feedbacks.entity";
import { Team } from "./teams.entiy";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 150 })
  @Exclude()
  password: string;

  @Column({ default: "student" })
  type: string;

  @Column({ length: 50, unique: true })
  registration: string;

  @Column({ length: 25 })
  shift: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @ManyToOne(() => Team)
  team: Team;

  @OneToMany(() => Feedback, (feedback) => feedback.student, { eager: true })
  feedbacks: Feedback[];
}
