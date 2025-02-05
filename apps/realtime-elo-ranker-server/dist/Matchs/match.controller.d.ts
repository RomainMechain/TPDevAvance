import { Response } from 'express';
import { Match } from './interfaces/match.interface';
import { MatchService } from './match.service';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    addMatch(match: Match, res: Response): any;
    getMatches(): any;
}
