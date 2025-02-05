import { Post, Body, Res, Get, Controller } from '@nestjs/common';
import { Response } from 'express';
import { Match } from './interfaces/match.interface';
import { MatchService } from './match.service';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('/api/match')
  addMatch(@Body() match: Match, @Res() res: Response): any {
    let result;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = this.matchService.addMatch(match);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.message === 'Player not found') {
        return res.status(422).json({
          code: 422,
          message: "Soit le gagnant, soit le perdant indiqué n'existe pas",
        });
      }
    }
    return res.status(200).json(result);
  }

  @Get('/api/match')
  getMatches(): any {
    return this.matchService.getMatches();
  }
}
