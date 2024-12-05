import { IsArray, IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto {

    @IsString()
    fullname:string;
    
    @IsEmail()
    email:string;
    
    @IsString()
    @MinLength(1)
    password:string;

    @IsArray()
    @IsOptional()
    role?:string
}
