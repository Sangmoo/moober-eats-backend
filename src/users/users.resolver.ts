import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  UserProfileInput,
  UserProfileOutput,
} from 'src/restaurants/dtos/user-profile.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.userService.createAccount(
        createAccountInput,
      );
      return {
        ok,
        error,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Mutation(returns => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const { ok, error, token } = await this.userService.login(loginInput);
      return {
        ok,
        error,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query(returns => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  // Profile for User
  @UseGuards(AuthGuard)
  @Query(returns => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    try {
      const user = await this.userService.findById(userProfileInput.userId);
      if (!user) {
        throw Error(); // return "User Not Found"
      }
      return {
        ok: true,
        user,
      };
    } catch (e) {
      return {
        error: 'User Not Found',
        ok: false,
      };
    }
  }
}
