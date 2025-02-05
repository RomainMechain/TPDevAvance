import { Response } from 'express';
import { Player } from './interfaces/player.interface';
import { PlayerService } from './player.service';
export declare class PlayerController {
    private readonly PlayerService;
    constructor(PlayerService: PlayerService);
    getPlayers(): any;
    addPlayer(player: Player, res: Response): any;
}
