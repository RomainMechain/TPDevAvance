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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
    getPlayers() {
        return this.appService.getPlayers();
    }
    addPlayer(player, res) {
        let result;
        try {
            result = this.appService.addPlayer(player);
        }
        catch (error) {
            if (error.message === 'Player already exists') {
                return res.status(409).json({
                    code: 409,
                    message: 'Le joueur existe déjà',
                });
            }
            else if (error.message === 'Player id is empty') {
                return res.status(400).json({
                    code: 400,
                    message: 'L identifiant du joueur n est pas valide',
                });
            }
        }
        return res.status(200).json(result);
    }
    addMatch(match, res) {
        let result;
        try {
            result = this.appService.addMatch(match);
        }
        catch (error) {
            if (error.message === 'Player not found') {
                return res.status(422).json({
                    code: 422,
                    message: "Soit le gagnant, soit le perdant indiqué n'existe pas",
                });
            }
        }
        return res.status(200).json(result);
    }
    getMatches() {
        return this.appService.getMatches();
    }
    getRanking(res) {
        let result;
        try {
            result = this.appService.getRanking();
        }
        catch (error) {
            if (error.message === 'No player found') {
                return res.status(404).json({
                    code: 404,
                    message: 'Le classement n est pas disponible car aucun joueur n existe',
                });
            }
        }
        return res.status(200).json(result);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getData", null);
__decorate([
    (0, common_1.Get)('/api/player'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getPlayers", null);
__decorate([
    (0, common_1.Post)('/api/player'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "addPlayer", null);
__decorate([
    (0, common_1.Post)('/api/match'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "addMatch", null);
__decorate([
    (0, common_1.Get)('/api/match'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getMatches", null);
__decorate([
    (0, common_1.Get)('/api/ranking'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "getRanking", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map