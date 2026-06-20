import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/application/user.service';
import { JwtService } from '@nestjs/jwt';
//import { Error } from '../common/exceptions/business.exceptio{ User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Omit<User, 'senha'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('E-mail/senha não confere');
    }

    const isMatch = await bcrypt.compare(pass, user.senha);
    if (!isMatch) {
      throw new Error('E-mail/senha não confere');
    }

    if (!user.ativo) {
      throw new Error('Conta aguardando liberação do administrador');
    }

    const { senha, ...result } = user;
    return result;
  }

  async login(user: Omit<User, 'senha'>): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id, role: user.role, nome: user.nome };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}