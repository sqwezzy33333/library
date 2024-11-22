import { Module } from "@nestjs/common";
import { AlbumController } from "./controller/album.controller";
import { AlbumService } from "./service/album.service";
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [PrismaModule],
  exports: [AlbumService],
})
export class AlbumModule {}
