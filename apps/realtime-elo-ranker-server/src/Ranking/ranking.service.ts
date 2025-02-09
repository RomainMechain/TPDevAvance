import { Injectable } from '@nestjs/common';
import { Player } from '../Players/interfaces/player.interface';
import { PlayerService } from '../Players/player.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class RankingService {
  private static eventsSubject = new Subject<MessageEvent>();

  constructor(private readonly playerService: PlayerService) {}

  getRanking(): Player[] {
    const players = this.playerService.getPlayers();
    if (players.length === 0) {
      throw new Error('No player found');
    }
    return players.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
  }

  @OnEvent('rankingUpdate')
  handleRankingUpdateEvent(player: Player) {
    console.log('handleRankingUpdateEvent TRIGGERED!', player);

    const eventData = {
      type: 'RankingUpdate',
      player: {
        id: player.id,
        rank: player.rank,
      },
    };

    const event: MessageEvent = new MessageEvent('RankingUpdate', {
      data: JSON.stringify(eventData),
    });

    RankingService.eventsSubject.next(event);
  }

  getEvents(): Observable<MessageEvent> {
    return RankingService.eventsSubject.asObservable();
  }
}
