import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { PlayerModule } from '../Players/player.module'; // Importez le module Player

@Module({
  imports: [PlayerModule], // Ajoutez PlayerModule aux imports
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
