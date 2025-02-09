"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RankingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../Players/player.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const rxjs_1 = require("rxjs");
let RankingService = RankingService_1 = class RankingService {
    constructor(playerService) {
        this.playerService = playerService;
    }
    getRanking() {
        const players = this.playerService.getPlayers();
        if (players.length === 0) {
            throw new Error('No player found');
        }
        return players.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
    }
    handleRankingUpdateEvent(player) {
        console.log('handleRankingUpdateEvent TRIGGERED!', player);
        const eventData = {
            type: 'RankingUpdate',
            player: {
                id: player.id,
                rank: player.rank,
            },
        };
        const event = new MessageEvent('RankingUpdate', {
            data: JSON.stringify(eventData),
        });
        RankingService_1.eventsSubject.next(event);
    }
    getEvents() {
        return RankingService_1.eventsSubject.asObservable();
    }
};
exports.RankingService = RankingService;
RankingService.eventsSubject = new rxjs_1.Subject();
__decorate([
    (0, event_emitter_1.OnEvent)('rankingUpdate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RankingService.prototype, "handleRankingUpdateEvent", null);
exports.RankingService = RankingService = RankingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], RankingService);
//# sourceMappingURL=ranking.service.js.map