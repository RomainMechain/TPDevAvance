"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor() {
        this.data = 'Un test pour voir si ca marche';
        this.players = [];
        this.matches = [];
    }
    getHello() {
        return 'Hello World!';
    }
    getData() {
        return this.data;
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
            return 200;
        }
        let total = 0;
        this.players.forEach((p) => {
            total += p.rank || 0;
        });
        return total / this.players.length;
    }
    getMatches() {
        return this.matches;
    }
    addMatch(match) {
        this.matches.push(match);
        const winner = this.players.find((p) => p.id === match.winner);
        const loser = this.players.find((p) => p.id === match.loser);
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
    getRanking() {
        if (this.players.length === 0) {
            throw new Error('No player found');
        }
        return this.players.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map