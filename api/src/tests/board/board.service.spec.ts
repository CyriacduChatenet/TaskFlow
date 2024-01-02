import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

import { BoardService } from '../../board/board.service';
import { BoardRepository } from '../../board/board.repository';
import { CreateBoardDto } from '../../board/dto/create-board.dto';
import { APIQuery } from '../../types/query.type';
import { Board } from '../../board/entities/board.entity';

describe('BoardService', () => {
  let service: BoardService;
  let repo: jest.Mocked<BoardRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: BoardRepository,
          useValue: {}, // Provide your mock here
        },
      ],
    }).compile();

    service = module.get<BoardService>(BoardService);
    repo = module.get(BoardRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call the repository with correct parameters', async () => {
      const dto: Board = {
        id: '',
        name: '',
        template: {
          id: '',
          name: '',
          teams: [],
          boards: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repo.createBoard.mockResolvedValue(dto);

      await service.create(dto);

      expect(repo.createBoard).toHaveBeenCalledWith(dto);
    });

    it('should throw UnauthorizedException if repository throws error', async () => {
      const dto = new CreateBoardDto();
      repo.createBoard.mockRejectedValue(new Error());

      await expect(service.create(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('findAll', () => {
    it('should call the repository with correct parameters', async () => {
      const query: APIQuery = {};

      const result = {
        data: [],
        count: 0,
        page: 0,
        limit: 0,
      };

      repo.findAllBoards.mockResolvedValue(result);

      await service.findAll(query);

      expect(repo.findAllBoards).toHaveBeenCalledWith(query);
    });

    it('should throw NotFoundException if repository throws error', async () => {
      const query: APIQuery = {};
      repo.findAllBoards.mockRejectedValue(new Error());

      await expect(service.findAll(query)).rejects.toThrow(NotFoundException);
    });
  });
});
