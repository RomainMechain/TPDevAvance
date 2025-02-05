import { Match } from './interfaces/match.interface';
import { PlayerService } from 'src/Players/player.service';
export declare class MatchService {
    private readonly playerService;
    private matches;
    constructor(playerService: PlayerService);
    getMatches(): Match[];
    addMatch(match: Match): any;
    getProba(playerRank: number, advRank: number): number;
}
