import { Test, TestingModule } from '@nestjs/testing';

import { BoardController } from '../../board/board.controller';
import { BoardService } from '../../board/board.service';
import { UpdateBoardDto } from '../../board/dto/update-board.dto';
import { APIQuery } from '../../types/query.type';
import { BoardRepository } from '../../board/board.repository';
import { Board } from '../../board/entities/board.entity';

describe('BoardController', () => {
  let boardController: BoardController;
  let boardService: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        BoardService,
        {
          provide: BoardRepository,
          useValue: {}, // Provide your mock here
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardController = module.get<BoardController>(BoardController);
  });

  it('should be defined', () => {
    expect(boardController).toBeDefined();
  });

  it('should create a board', async () => {
    const dto: Board = {
      name: '',
      id: '',
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
    jest.spyOn(boardService, 'create').mockImplementation(async () => dto);

    expect(await boardController.create(dto)).toBe(dto);
  });

  it('should find all boards', async () => {
    const query: APIQuery = {
      /* fill with appropriate data */
    };
    const result = {
      data: [],
      count: 0,
      page: 0,
      limit: 0,
    }; // replace with expected result
    jest.spyOn(boardService, 'findAll').mockImplementation(async () => result);

    expect(await boardController.findAll(query)).toBe(result);
  });

  it('should find one board by id', async () => {
    const id = 'testId';
    const result: Board = {
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
    }; // replace with expected result
    jest
      .spyOn(boardService, 'findOneById')
      .mockImplementation(async () => result);

    expect(await boardController.findOneById(id)).toBe(result);
  });

  it('should find one board by name', async () => {
    const name = 'testName';
    const result: Board = {
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
    }; // replace with expected result
    jest
      .spyOn(boardService, 'findOneByName')
      .mockImplementation(async () => result);

    expect(await boardController.findOneByName(name)).toBe(result);
  });

  it('should update a board', async () => {
    const result = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };
    jest
      .spyOn(boardService, 'update')
      .mockImplementation(() => Promise.resolve(result));

    expect(await boardController.update('1', new UpdateBoardDto())).toBe(
      result,
    );
  });

  it('should remove a board', async () => {
    const result = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };
    jest
      .spyOn(boardService, 'remove')
      .mockImplementation(() => Promise.resolve(result));

    expect(await boardController.remove('1')).toBe(result);
  });
});
