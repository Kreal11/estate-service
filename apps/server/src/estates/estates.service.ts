import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll(id: number) {
    return await this.estateRepository.find({
      where: {
        user: { id },
      },
      // relations: {
      //   transactions: true,
      // },
    });
  }

  async findOne(id: number) {
    const estate = await this.estateRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!estate) throw new NotFoundException('Estate was not found');

    return estate;
  }

  async update(id: number, updateEstateDto: UpdateEstateDto) {
    const estate = await this.estateRepository.findOne({
      where: { id },
    });

    if (!estate) throw new NotFoundException('Estate was not found');

    return await this.estateRepository.update(id, updateEstateDto);
  }

  async remove(id: number) {
    const estate = await this.estateRepository.findOne({
      where: { id },
    });

    if (!estate) throw new NotFoundException('Estate was not found');

    return await this.estateRepository.delete(id);
  }
}
