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
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/shared/decorators';
import { CursoService } from './curso.service';
import { AddAlunoDto } from './dto/add-aluno.dto';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';

@ApiTags('Curso')
@Controller('curso')
@UseGuards(RolesGuard)
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Post(':id/alunos')
  @Roles(Role.Admin)
  addAluno(
    @Param('id', ParseIntPipe) id: number,
    @Body() addAlunoDto: AddAlunoDto,
  ) {
    return this.cursoService.addAluno(id, addAlunoDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.cursoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cursoService.findOne(id);
  }

  @Patch(':id')
  @IsPublic()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCursoDto: UpdateCursoDto,
  ) {
    return this.cursoService.update(id, updateCursoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cursoService.remove(+id);
  }
}
