import { Injectable } from '@nestjs/common';

export interface Player {
  id: string;
  rank?: number;
}

export interface Match {
  winner: string;
  loser: string;
  draw?: boolean;
}

@Injectable()
export class AppService {
  private data: string = 'Un test pour voir si ca marche';
  private players: Player[] = [];
  private matches: Match[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  getData(): string {
    return this.data;
  }

  getPlayers(): Player[] {
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

  getMatches(): Match[] {
    return this.matches;
  }

  addMatch(match: Match): any {
    this.matches.push(match);
    const winner = this.players.find((p) => p.id === match.winner);
    const loser = this.players.find((p) => p.id === match.loser);

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

  getRanking(): Player[] {
    if (this.players.length === 0) {
      throw new Error('No player found');
    }
    return this.players.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
  }
}
