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
} from '@nestjs/common';
import { TrackService } from '../service/track.service';
import { isUUID } from 'class-validator';
import { TrackDto, TrackResponse } from '../models';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('track')
export class TrackController {

  @Get()
  @ApiOkResponse({ description: 'Return tracks', type: [TrackResponse] })
  getTracks() {
    return this.trackService.getTracks();
  }

  @Post()
  @ApiOkResponse({ description: 'Create track', type: TrackResponse })
  @HttpCode(201)
  async createTrack(
    @Body(ValidationPipe) createTrackDto: TrackDto,
  ) {
    return this.trackService.addTrack(createTrackDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return track', type: TrackResponse })
  async findOne(@Param('id') id: string) {
    const track = this.trackService.isTrack(id);
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    if (!track) {
      throw new NotFoundException('User not found');
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const track = this.trackService.isTrack(id);
    if (!track) {
      throw new NotFoundException('User not found');
    }
    return this.trackService.deleteTrack(track);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Edit track', type: TrackResponse })
  async editTrack(@Param('id') id: string, @Body(ValidationPipe) body: TrackDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const track = this.trackService.isTrack(id);
    if (!track) {
      throw new NotFoundException('User not found');
    }
    return this.trackService.editTrack(track, body);
  }

  constructor(private trackService: TrackService) {
  }
}
