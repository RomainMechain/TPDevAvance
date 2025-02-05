import { Player } from './interfaces/player.interface';
export declare class PlayerService {
    private players;
    getPlayers(): Player[];
    addPlayer(player: Player): any;
    getAvgRank(): number;
}
