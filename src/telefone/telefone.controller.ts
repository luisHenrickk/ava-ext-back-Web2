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
import { TelefoneService } from './telefone.service';
import { CreateTelefoneDto } from './dto/create-telefone.dto';
import { UpdateTelefoneDto } from './dto/update-telefone.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { IsPublic } from 'src/shared/decorators';

@ApiTags('Telefone')
@Controller('telefone')
@UseGuards(RolesGuard)
export class TelefoneController {
  constructor(private readonly telefoneService: TelefoneService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createTelefoneDto: CreateTelefoneDto) {
    return this.telefoneService.create(createTelefoneDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.telefoneService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.telefoneService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Aluno)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTelefoneDto: UpdateTelefoneDto,
  ) {
    return this.telefoneService.update(id, updateTelefoneDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.telefoneService.remove(id);
  }
}
