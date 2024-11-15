import { Module } from "@nestjs/common";
import { ArtistService } from "./service/artist.service";
import { ArtistController } from "./controller/artist.controller";
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [PrismaModule],
  exports: [ArtistService],
})
export class ArtistModule {}
