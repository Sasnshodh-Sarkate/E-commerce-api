import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/loginUser.Dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
// import { Role } from 'src/users/entities/role.entity';
// import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
// import { use } from 'passport';
// import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtServices: JwtService,
  ) {}

  async login(loginDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtServices.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
      },
    };

    // create(createAuthDto: CreateAuthDto) {
    //   return 'This action adds a new auth';
    // }
    // findAll() {
    //   return `This action returns all auth`;
    // }
    // findOne(id: number) {
    //   return `This action returns a #${id} auth`;
    // }
    // update(id: number, updateAuthDto: UpdateAuthDto) {
    //   return `This action updates a #${id} auth`;
    // }
    // remove(id: number) {
    //   return `This action removes a #${id} auth`;
    // }
  }
}
