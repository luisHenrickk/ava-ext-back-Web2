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
import { ApiTags } from '@nestjs/swagger/dist';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { IsPublic } from 'src/shared/decorators';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@ApiTags('Aluno')
@Controller('aluno')
@UseGuards(RolesGuard)
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Professor)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.alunoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Professor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.findOne(id);
  }

  @Get('/curso/:id')
  @Roles(Role.Admin, Role.Professor)
  findByCurso(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.findByCurso(id);
  }

  @Patch(':id')
  @IsPublic()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return this.alunoService.update(id, updateAlunoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.remove(id);
  }
}
