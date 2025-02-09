import { Get, Res, Controller, Sse } from '@nestjs/common';
import { Response } from 'express';
import { RankingService } from './ranking.service';
import { Observable } from 'rxjs';

@Controller('api/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  getRanking(@Res() res: Response): any {
    try {
      const result = this.rankingService.getRanking();
      return res.status(200).json(result);
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
  }

  @Sse('/events')
  getEvents(): Observable<MessageEvent> {
    console.log('SSE connection established');
    return this.rankingService.getEvents();
  }
}
