import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { APIQuery } from '../types/query.type';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  create(createBoardDto: CreateBoardDto) {
    try {
      return this.boardRepository.createBoard(createBoardDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  findAll(query: APIQuery) {
    try {
      return this.boardRepository.findAllBoards(query);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOneById(id: string) {
    try {
      return this.boardRepository.findOneBoardById(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOneByName(name: string) {
    try {
      return this.boardRepository.findOneBoardByName(name);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    try {
      return this.boardRepository.updateBoard(id, updateBoardDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  remove(id: string) {
    try {
      return this.boardRepository.deleteBoard(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
