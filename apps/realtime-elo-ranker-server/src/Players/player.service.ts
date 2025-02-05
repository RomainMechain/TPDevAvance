import { Injectable } from '@nestjs/common';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayerService {
  private players: Player[] = [];

  public getPlayers(): Player[] {
    return this.players;
  }

  addPlayer(player: Player): any {
    const existingPlayer = this.players.find((p) => p.id === player.id);
    if (player.id === '') {
      throw new Error('Player id is empty');
    }
    if (!existingPlayer) {
      player.rank = player.rank || this.getAvgRank();
      this.players.push(player);
      return {
        id: player.id,
        rank: player.rank,
      };
    } else {
      throw new Error('Player already exists');
    }
  }

  getAvgRank(): number {
    if (this.players.length === 0) {
      return 200;
    }
    let total = 0;
    this.players.forEach((p) => {
      total += p.rank || 0;
    });
    return total / this.players.length;
  }
}
