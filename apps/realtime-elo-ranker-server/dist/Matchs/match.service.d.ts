import { Match } from './interfaces/match.interface';
import { PlayerService } from 'src/Players/player.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MatchService {
    private readonly playerService;
    private readonly eventEmitter;
    private matches;
    constructor(playerService: PlayerService, eventEmitter: EventEmitter2);
    getMatches(): Match[];
    addMatch(match: Match): any;
    getProba(playerRank: number, advRank: number): number;
}
