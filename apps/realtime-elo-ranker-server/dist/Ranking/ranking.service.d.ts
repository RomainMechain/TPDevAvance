import { Player } from '../Players/interfaces/player.interface';
import { PlayerService } from '../Players/player.service';
import { Observable } from 'rxjs';
export declare class RankingService {
    private readonly playerService;
    private static eventsSubject;
    constructor(playerService: PlayerService);
    getRanking(): Player[];
    handleRankingUpdateEvent(player: Player): void;
    getEvents(): Observable<MessageEvent>;
}
