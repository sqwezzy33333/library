import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const path = request.url.split('/')[1];
    try {
      if (
        ['auth', 'api-docs'].includes(path)
      ) {
        return true;
      }
      const jwtToken = this.getJwtToken(request);
      request.user = this.jwtService.verify(jwtToken);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  getJwtToken(request: {
    headers?: Headers;
  }) {
    const auth = request.headers['authorisation'] || request.headers['Authorization'];
    if (Array.isArray(auth) || !auth) {
      throw new UnauthorizedException('Invalid Authorization');
    }
    const [name, token] = auth.split(' ');
    if (name != 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization');
    }
    return token;
  }

  constructor(
    private readonly jwtService: JwtService,
  ) {
  }
}
