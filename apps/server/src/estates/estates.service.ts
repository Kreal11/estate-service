import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstateDto } from './dto/create-estate.dto';
import { UpdateEstateDto } from './dto/update-estate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estate } from './entities/estate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstatesService {
  constructor(
    @InjectRepository(Estate)
    private readonly estateRepository: Repository<Estate>,
  ) {}

  async create(createEstateDto: CreateEstateDto, id: number) {
    const isExist = await this.estateRepository.findBy({
      user: { id },
      title: createEstateDto.title,
    });

    if (isExist.length)
      throw new BadRequestException('This estate already exists');

    const newEstate = {
      title: createEstateDto.title,
      user: {
        id,
      },
    };

    return await this.estateRepository.save(newEstate);
  }

  findAll() {
    return `This action returns all estates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estate`;
  }

  update(id: number, updateEstateDto: UpdateEstateDto) {
    return `This action updates a #${id} estate`;
  }

  remove(id: number) {
    return `This action removes a #${id} estate`;
  }
}
