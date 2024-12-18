import { IsDate, IsIn, IsNotEmpty, IsString, IsUUID, Length } from "class-validator"
import { TaskPriority, TaskStatus } from "src/enums";



export class CreateTaskDto {

    @IsString()
    @Length(3, 12)
    @IsNotEmpty()
    title: string
    
    
    @IsString()
    @Length(3, 50)
    @IsNotEmpty()
    description: string
    
    @IsIn(Object.values(TaskStatus))
    @IsNotEmpty()
    status: TaskStatus;
    
    @IsIn(Object.values(TaskPriority))
    @IsNotEmpty()
    priority: TaskPriority

    @IsUUID()
    @IsNotEmpty()
    userId: string // Genera un UUID por defecto
    
    //@IsDate()
    //createdAt: Date
    
    //@IsDate()
    //updatedAt: Date


}
