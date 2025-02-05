import { Injectable } from '@nestjs/common';
import { Player } from '../Players/interfaces/player.interface';
import { PlayerService } from '../Players/player.service';

@Injectable()
export class RankingService {
  constructor(private readonly playerService: PlayerService) {}

  getRanking(): Player[] {
    const players = this.playerService.getPlayers();
    if (players.length === 0) {
      throw new Error('No player found');
    }
    return players.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
  }
}
