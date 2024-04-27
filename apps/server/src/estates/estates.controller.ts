import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EstatesService } from './estates.service';
import { CreateEstateDto } from './dto/create-estate.dto';
import { UpdateEstateDto } from './dto/update-estate.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

type User = {
  user: {
    id: string;
    email: string;
  };
};

@Controller('estates')
export class EstatesController {
  constructor(private readonly estatesService: EstatesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEstateDto: CreateEstateDto, @Req() req: User) {
    return this.estatesService.create(createEstateDto, +req.user.id);
  }

  @Get()
  findAll() {
    return this.estatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstateDto: UpdateEstateDto) {
    return this.estatesService.update(+id, updateEstateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estatesService.remove(+id);
  }
}
