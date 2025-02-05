import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './Players/player.module';
import { RankingModule } from './Ranking/ranking.module';
import { MatchModule } from './Matchs/match.module';

@Module({
  imports: [PlayerModule, RankingModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
