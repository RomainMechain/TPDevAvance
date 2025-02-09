import { Injectable } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PlayerService {
  private players: Player[] = [];

  constructor(private readonly eventEmitter: EventEmitter2) {}

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

      this.eventEmitter.emit('rankingUpdate', player);
      console.log('Event emitted: rankingUpdate', player);

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
      return 1000;
    }
    return (
      this.players.reduce((total, p) => total + (p.rank ?? 0), 0) /
      this.players.length
    );
  }
}
