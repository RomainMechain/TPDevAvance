import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { PlayerModule } from '../Players/player.module';

@Module({
  imports: [PlayerModule],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
