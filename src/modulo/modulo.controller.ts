import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { IsPublic } from 'src/shared/decorators';

@ApiTags('Módulo')
@Controller('modulo')
@UseGuards(RolesGuard)
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Post()
  @Roles(Role.Admin, Role.Professor)
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.moduloService.create(createModuloDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.moduloService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moduloService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Professor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateModuloDto: UpdateModuloDto,
  ) {
    return this.moduloService.update(id, updateModuloDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Professor)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moduloService.remove(id);
  }
}
