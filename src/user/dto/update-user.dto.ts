import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  firstName: String;

  @ApiProperty()
  @IsString()
  lastName: String;
}
