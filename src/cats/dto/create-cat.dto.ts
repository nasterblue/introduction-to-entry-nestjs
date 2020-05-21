import {ApiProperty} from '@nestjs/swagger';

export enum CatBreed {
  male = 'male',
  female = 'female'
}

export class CreateCatDto {
  @ApiProperty({example: "Tom"})
  name: string;

  @ApiProperty({example: 1})
  age: number;

  @ApiProperty({enum: CatBreed, enumName: 'CatBreed'})
  breed: string;
}