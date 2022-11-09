import { Test, TestingModule } from '@nestjs/testing';
import { QuestaoService } from './questao.service';

describe('QuestaoService', () => {
  let service: QuestaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestaoService],
    }).compile();

    service = module.get<QuestaoService>(QuestaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
