import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEnum, IsOptional } from "class-validator"
import { TaskPriority, TaskStatus } from "src/enums"

export class FilterDto {

    @ApiProperty({
        enum: TaskStatus,
        required: false,
      })
      @IsOptional()
      @IsEnum(TaskStatus) // Valida que el valor sea parte del enum TaskStatus
      @Type(() => String) // Convierte el valor recibido a String
      status?: TaskStatus;
    
      @ApiProperty({
        enum: TaskPriority,
        required: false,
      })
      @IsOptional()
      @IsEnum(TaskPriority) 
      @Type(() => String) 
      priority?: TaskPriority;

}