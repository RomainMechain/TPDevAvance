import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PlayerModule } from 'src/Players/player.module';

@Module({
  imports: [PlayerModule],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
