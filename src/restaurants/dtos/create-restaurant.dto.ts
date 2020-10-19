import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateRestaurantDto {
  @Field(type => String)
  name: string;
  @Field(type => Boolean)
  isBegan: boolean;
  @Field(type => String)
  address: string;
  @Field(type => String)
  ownerName: string;
}
