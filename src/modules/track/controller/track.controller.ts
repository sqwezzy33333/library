import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post, Put,
  ValidationPipe,
} from "@nestjs/common";
import { TrackService } from "../service/track.service";
import { isUUID } from "class-validator";
import { TrackDto } from "../models";

@Controller("track")
export class TrackController {

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Post()
  @HttpCode(201)
  async createTrack(
    @Body(ValidationPipe) createTrackDto: TrackDto,
  ) {
    return this.trackService.addTrack(createTrackDto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const track = this.trackService.isTrack(id);
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }

    if (!track) {
      throw new NotFoundException("User not found");
    }
    return track;
  }

  @Delete(":id")
  @HttpCode(204)
  async deleteOne(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const track = this.trackService.isTrack(id);
    if (!track) {
      throw new NotFoundException("User not found");
    }
    return this.trackService.deleteTrack(track);
  }

  @Put(":id")
  async editUser(@Param("id") id: string, @Body(ValidationPipe) body: TrackDto) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const track = this.trackService.isTrack(id);
    if (!track) {
      throw new NotFoundException("User not found");
    }
    return this.trackService.editTrack(track, body);
  }

  constructor(private trackService: TrackService) {
  }
}