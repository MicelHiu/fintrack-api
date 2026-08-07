import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
        @IsString()
        @MaxLength(255)
        name!: string;
    
        @IsString()
        @IsEmail()
        email!: string;
    
        /* @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/) //musti 8  */
        @IsString()
        @MaxLength(8)
        password!: string;
    
        @IsString()
        @MaxLength(20)
        role!: string;
}