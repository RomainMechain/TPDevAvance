import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { PlayerModule } from '../Players/player.module';

@Module({
  imports: [PlayerModule],
  providers: [RankingService],
  exports: [RankingService],
})
export class RankingModule {}
