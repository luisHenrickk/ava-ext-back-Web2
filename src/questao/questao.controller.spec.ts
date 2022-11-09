import { Test, TestingModule } from '@nestjs/testing';
import { QuestaoController } from './questao.controller';
import { QuestaoService } from './questao.service';

describe('QuestaoController', () => {
  let controller: QuestaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestaoController],
      providers: [QuestaoService],
    }).compile();

    controller = module.get<QuestaoController>(QuestaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
