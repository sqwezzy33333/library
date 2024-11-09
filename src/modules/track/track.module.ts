import { Module } from "@nestjs/common";
import { TrackController } from "./controller/track.controller";
import { TrackService } from "./service/track.service";

@Module({
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
