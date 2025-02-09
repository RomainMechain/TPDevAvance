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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../Players/player.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let MatchService = class MatchService {
    constructor(playerService, eventEmitter) {
        this.playerService = playerService;
        this.eventEmitter = eventEmitter;
        this.matches = [];
    }
    getMatches() {
        return this.matches;
    }
    addMatch(match) {
        this.matches.push(match);
        const players = this.playerService.getPlayers();
        const winner = players.find((p) => p.id === match.winner);
        const loser = players.find((p) => p.id === match.loser);
        if (!winner || !loser) {
            throw new Error('Player not found');
        }
        const coef = 32;
        let resWin = 1;
        let resLos = 0;
        if (match.draw) {
            resLos = 0.5;
            resWin = 0.5;
        }
        const probaWin = this.getProba(winner.rank ?? 0, loser.rank ?? 0);
        const probaLos = this.getProba(loser.rank ?? 0, winner.rank ?? 0);
        winner.rank = (winner.rank ?? 0) + coef * (resWin - probaWin);
        loser.rank = (loser.rank ?? 0) + coef * (resLos - probaLos);
        this.eventEmitter.emit('rankingUpdate', winner);
        this.eventEmitter.emit('rankingUpdate', loser);
        return {
            winner: {
                id: winner.id,
                rank: winner.rank,
            },
            loser: {
                id: loser.id,
                rank: loser.rank,
            },
        };
    }
    getProba(playerRank, advRank) {
        return 1 / (1 + 10 ** ((playerRank - advRank) / 400));
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        event_emitter_1.EventEmitter2])
], MatchService);
//# sourceMappingURL=match.service.js.map