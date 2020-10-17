import { Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";



// Use Restaurant Entity
@Resolver(of => Restaurant)
export class RestaurantResolver {
    
    @Query(returns => Restaurant)
    myRestaurant() {
        return true;
    }
}
