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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
let PlayerService = class PlayerService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.players = [];
    }
    getPlayers() {
        return this.players;
    }
    addPlayer(player) {
        const existingPlayer = this.players.find((p) => p.id === player.id);
        if (player.id === '') {
            throw new Error('Player id is empty');
        }
        if (!existingPlayer) {
            player.rank = player.rank || this.getAvgRank();
            this.players.push(player);
            this.eventEmitter.emit('rankingUpdate', player);
            console.log('Event emitted: rankingUpdate', player);
            return {
                id: player.id,
                rank: player.rank,
            };
        }
        else {
            throw new Error('Player already exists');
        }
    }
    getAvgRank() {
        if (this.players.length === 0) {
            return 1000;
        }
        return (this.players.reduce((total, p) => total + (p.rank ?? 0), 0) /
            this.players.length);
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], PlayerService);
//# sourceMappingURL=player.service.js.map