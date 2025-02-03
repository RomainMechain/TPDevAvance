import { AppService, Player, Match } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getData(): string;
    getPlayers(): any;
    addPlayer(player: Player, res: Response): any;
    addMatch(match: Match, res: Response): any;
    getMatches(): any;
    getRanking(res: Response): any;
}
