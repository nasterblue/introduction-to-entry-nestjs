import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {CatBreed} from '../dto/create-cat.dto';

@Entity()
export class CatsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({
    default: CatBreed.male
  })
  breed: CatBreed;
}