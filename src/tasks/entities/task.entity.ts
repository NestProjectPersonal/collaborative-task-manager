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
    title:string

    @Column()
    description:string

    @Column({
        default:'pending'
    })
    status:TaskStatus

    @Column()
    priority:TaskPriority

    @CreateDateColumn()
    createdAt:Date
    
    @UpdateDateColumn()
    updatedAt:Date
    
    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' }) // Relación con usuario
    user: User;

}
