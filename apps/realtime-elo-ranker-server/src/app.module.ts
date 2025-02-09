import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './Players/player.module';
import { RankingModule } from './Ranking/ranking.module';
import { MatchModule } from './Matchs/match.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    PlayerModule,
    RankingModule,
    MatchModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
