import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extract token from 'Authorization: Bearer <token>' header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-fallback-secret',
    });
  }

  // This runs AFTER the token is cryptographically verified
  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: any) {
    // The object returned here is attached to 'req.user'
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
