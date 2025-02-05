import { Get, Res, Controller } from '@nestjs/common';
import { Response } from 'express';
import { RankingService } from './ranking.service';

@Controller('/api/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  getRanking(@Res() res: Response): any {
    let result;
    try {
      result = this.rankingService.getRanking();
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
