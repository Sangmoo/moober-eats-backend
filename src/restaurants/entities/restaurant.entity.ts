import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  // @Field(type => Boolean, { defaultValue: true })
  @Field(type => Boolean, { nullable: true })
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;
  // isVegan?: boolean;

  @Field(type => String, { defaultValue: 'Seoul Enpyeong BulGwang' })
  @Column()
  address: string;

  // @Field(type => String)
  // @Column()
  // ownerName: string;

  // @Field(type => String)
  // @Column()
  // categoryName: string;
}
