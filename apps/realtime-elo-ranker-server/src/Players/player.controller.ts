import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Player } from './interfaces/player.interface';
import { PlayerService } from './player.service';

@Controller()
export class PlayerController {
  constructor(private readonly PlayerService: PlayerService) {}

  @Get('/api/player')
  getPlayers(): any {
    return this.PlayerService.getPlayers();
  }

  @Post('/api/player')
  addPlayer(@Body() player: Player, @Res() res: Response): any {
    let result;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = this.PlayerService.addPlayer(player);
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
}
