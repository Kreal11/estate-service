import { Module } from '@nestjs/common';
import { EstatesService } from './estates.service';
import { EstatesController } from './estates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estate } from './entities/estate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estate])],
  controllers: [EstatesController],
  providers: [EstatesService],
})
export class EstatesModule {}
