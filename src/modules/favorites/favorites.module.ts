import { Module } from "@nestjs/common";
import { FavoritesController } from "./controller/favorites.controller";
import { FavoritesService } from "./service/favorites.service";
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    AlbumModule,
    TrackModule,
    ArtistModule,
  ]
})
export class FavoritesModule {
}
