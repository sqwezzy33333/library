import { Module } from "@nestjs/common";
import { FavoritesController } from "./controller/favorites.controller";
import { FavoritesService } from "./service/favorites.service";

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {
}
