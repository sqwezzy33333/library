import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from "./modules/user/user.module";
import { TrackModule } from "./modules/track/track.module";
import { FavoritesModule } from "./modules/favorites/favorites.module";
import { ArtistModule } from "./modules/artist/artist.module";
import { AlbumModule } from "./modules/album/album.module";
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { LogModule } from './log/log.module';
import { LoggerMiddleware } from './log/log.middleware';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    TrackModule,
    FavoritesModule,
    ArtistModule,
    AlbumModule,
    AuthModule,
    LogModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
