import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from "@nestjs/common";
import { FavoritesService } from "../service/favorites.service";
import { isUUID } from "class-validator";

@Controller("favs")
export class FavoritesController {

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAll();
  }

  @Post("track/:id")
  addTrack(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const track = this.favoritesService.isTrack(id);
    if (!track) {
      throw new UnprocessableEntityException("Track not found");
    }
    return this.favoritesService.addTrack(track);
  }

  @Delete("track/:id")
  @HttpCode(204)
  deleteTrack(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const track = this.favoritesService.isTrack(id);
    if (!track) {
      throw new UnprocessableEntityException("Track not found");
    }
    return this.favoritesService.deleteTrack(track);
  }

  @Post("album/:id")
  addAlbum(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const album = this.favoritesService.isAlbum(id);
    if (!album) {
      throw new UnprocessableEntityException("Track not found");
    }
    return this.favoritesService.addAlbum(album);
  }

  @Delete("album/:id")
  @HttpCode(204)
  deleteAlbum(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const album = this.favoritesService.isAlbum(id);
    if (!album) {
      throw new UnprocessableEntityException("Track not found");
    }
    return this.favoritesService.deleteAlbum(album);
  }

  @Post("artist/:id")
  addArtist(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const artist = this.favoritesService.isArtist(id);
    if (!artist) {
      throw new UnprocessableEntityException("Track not found");
    }
    return this.favoritesService.addArtist(artist);
  }

  @Delete("artist/:id")
  @HttpCode(204)
  deleteArtist(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const artist = this.favoritesService.isArtist(id);
    if (!artist) {
      throw new UnprocessableEntityException("Track not found");
    }
    return this.favoritesService.deleteArtist(artist);
  }

  constructor(
    private favoritesService: FavoritesService,
  ) {
  }

}