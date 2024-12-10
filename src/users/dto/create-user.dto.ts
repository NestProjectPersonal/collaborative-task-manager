import { Transform } from "class-transformer";
import { IsArray, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {

    @IsString()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    //Expresion regular, nos ayuda a generar un password para evaluar la contraseña la cual debe cumplir unas condiciones
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;


    //@IsArray()
    @IsOptional()
    role?:string[]
}
