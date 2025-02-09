import { Player } from './interfaces/player.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PlayerService {
    private readonly eventEmitter;
    private players;
    constructor(eventEmitter: EventEmitter2);
    getPlayers(): Player[];
    addPlayer(player: Player): any;
    getAvgRank(): number;
}
