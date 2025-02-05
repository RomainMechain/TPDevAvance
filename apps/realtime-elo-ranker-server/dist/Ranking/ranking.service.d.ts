import { Player } from '../Players/interfaces/player.interface';
import { PlayerService } from '../Players/player.service';
export declare class RankingService {
    private readonly playerService;
    constructor(playerService: PlayerService);
    getRanking(): Player[];
}
