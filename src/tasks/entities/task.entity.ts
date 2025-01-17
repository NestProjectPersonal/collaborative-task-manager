import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskPriority, TaskStatus } from "src/enums";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tasks')
export class Tasks {

    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column({nullable: true})
    userId: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Column()
    status:TaskStatus

    @Column()
    priority:TaskPriority

    @CreateDateColumn()
    createdAt:Date
    
    @UpdateDateColumn()
    updatedAt:Date
    
    @ManyToOne(() => User, (user) => user.tasks, {  eager: true , onDelete: 'CASCADE' }) 
    user: User;

}
