import { MinLength, IsEnum } from "class-validator";
export class CreateNinjaDto{
    @MinLength(3)
    name:string;

    @IsEnum(["Nunchucks, Stars"],{message:"Use correct weapon"})
    weapon: "Nunchucls"| "Stars";
}