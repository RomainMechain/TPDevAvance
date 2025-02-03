import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService, Player, Match } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/data') // Add a slash before 'data' to match the route
  getData(): string {
    return this.appService.getData();
  }

  @Get('/api/player')
  getPlayers(): any {
    return this.appService.getPlayers();
  }

  @Post('/api/player')
  addPlayer(@Body() player: Player, @Res() res: Response): any {
    let result;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = this.appService.addPlayer(player);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.message === 'Player already exists') {
        return res.status(409).json({
          code: 409,
          message: 'Le joueur existe déjà',
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      } else if (error.message === 'Player id is empty') {
        return res.status(400).json({
          code: 400,
          message: 'L identifiant du joueur n est pas valide',
        });
      }
    }
    return res.status(200).json(result);
  }

  @Post('/api/match')
  addMatch(@Body() match: Match, @Res() res: Response): any {
    let result;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = this.appService.addMatch(match);
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
    return this.appService.getMatches();
  }

  @Get('/api/ranking')
  getRanking(@Res() res: Response): any {
    let result;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = this.appService.getRanking();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.message === 'No player found') {
        return res.status(404).json({
          code: 404,
          message:
            'Le classement n est pas disponible car aucun joueur n existe',
        });
      }
    }
    return res.status(200).json(result);
  }
}
