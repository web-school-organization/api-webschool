import { Exclude } from "class-transformer"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Feedback } from "./feedbacks.entity"

@Entity('teachers')
export class Teacher {

  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({length: 150})
  name:string

  @Column({length: 200, unique:true})
  email:string

  @Column({length: 150})
  @Exclude()
  password:string

  @Column({default:"teacher"})
  type:string

  @Column({length: 25})
  shift:string

  @Column({length: 50})
  matter:string

  @CreateDateColumn({type: "date"})
  createdAt:Date

  @CreateDateColumn({type:"date"})
  updatedAt:Date

  @OneToMany(()=> Feedback, (feedback)=>feedback.teacher, {eager:true})
  feedbacks:Feedback[]
}