import { Module } from "@nestjs/common";
import { ArtistService } from "./service/artist.service";
import { ArtistController } from "./controller/artist.controller";

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
