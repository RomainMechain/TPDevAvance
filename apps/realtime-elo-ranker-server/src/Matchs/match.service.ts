import { Injectable } from '@nestjs/common';
import { Match } from './interfaces/match.interface';
import { PlayerService } from 'src/Players/player.service';

@Injectable()
export class MatchService {
  private matches: Match[] = [];

  constructor(private readonly playerService: PlayerService) {}

  getMatches(): Match[] {
    return this.matches;
  }

  addMatch(match: Match): any {
    this.matches.push(match);
    const players = this.playerService.getPlayers();
    const winner = players.find((p) => p.id === match.winner);
    const loser = players.find((p) => p.id === match.loser);

    if (!winner || !loser) {
      throw new Error('Player not found');
    }

    // A continuer ici pour mettre en place le calcul du rank
    const coef = 32;
    let resWin = 1;
    let resLos = 0;
    if (match.draw) {
      resLos = 0.5;
      resWin = 0.5;
    }
    const probaWin = this.getProba(winner.rank ?? 0, loser.rank ?? 0);
    const probaLos = this.getProba(loser.rank ?? 0, winner.rank ?? 0);

    winner.rank = (winner.rank ?? 0) + coef * (resWin - probaWin);
    loser.rank = (loser.rank ?? 0) + coef * (resLos - probaLos);

    return {
      winner: {
        id: winner.id,
        rank: winner.rank,
      },
      loser: {
        id: loser.id,
        rank: loser.rank,
      },
    };
  }

  getProba(playerRank: number, advRank: number): number {
    return 1 / (1 + 10 ** ((playerRank - advRank) / 400));
  }
}
