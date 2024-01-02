import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { APIQuery } from '../types/query.type';

export class BoardRepository extends Repository<Board> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.create(createBoardDto);
    return this.save(board);
  }

  async findAllBoards(
    queries: APIQuery,
  ): Promise<{ page: number; limit: number; count: number; data: Board[] }> {
    let { page, limit, name } = queries;

    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('board').leftJoinAndSelect(
      'board.template',
      'template',
    );

    if (name) query.andWhere('board.name = :name', { name });

    return {
      page,
      limit,
      count: await query.getCount(),
      data: await query
        .skip((page - 1) * limit)
        .take(limit)
        .getMany(),
    };
  }

  async findOneBoardById(id: string): Promise<Board> {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.template', 'template')
      .where('board.id = :id', { id })
      .getOne();
  }

  async findOneBoardByName(name: string): Promise<Board> {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.template', 'template')
      .where('board.name = :name', { name })
      .getOne();
  }

  async updateBoard(id: string, updateBoardDto: CreateBoardDto) {
    return this.update(id, updateBoardDto);
  }

  async deleteBoard(id: string) {
    return this.softDelete(id);
  }
}
