import { Module } from "@nestjs/common";
import { TrackController } from "./controller/track.controller";
import { TrackService } from "./service/track.service";
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [TrackController],
  imports: [PrismaModule],
  providers: [TrackService],
})
export class TrackModule {}
