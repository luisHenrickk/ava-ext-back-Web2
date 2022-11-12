import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { AulaService } from './aula.service';
import { AddAlunoDto } from './dto/add-aluno.dto';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { IsPublic } from 'src/shared/decorators';

@ApiTags('Aula')
@Controller('aula')
@UseGuards(RolesGuard)
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Post()
  @Roles(Role.Admin, Role.Professor)
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulaService.create(createAulaDto);
  }

  @Post(':id/alunos')
  @Roles(Role.Admin, Role.Professor)
  addAluno(
    @Param('id', ParseIntPipe) id: number,
    @Body() addAlunoDto: AddAlunoDto,
  ) {
    return this.aulaService.addAluno(id, addAlunoDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.aulaService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.aulaService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Professor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAulaDto: UpdateAulaDto,
  ) {
    return this.aulaService.update(id, updateAulaDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Professor)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.aulaService.remove(id);
  }
}
