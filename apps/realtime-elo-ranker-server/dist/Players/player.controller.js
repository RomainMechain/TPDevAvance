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
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("./player.service");
let PlayerController = class PlayerController {
    constructor(PlayerService) {
        this.PlayerService = PlayerService;
    }
    getPlayers() {
        return this.PlayerService.getPlayers();
    }
    addPlayer(player, res) {
        let result;
        try {
            result = this.PlayerService.addPlayer(player);
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
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_1.Get)('/api/player'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], PlayerController.prototype, "getPlayers", null);
__decorate([
    (0, common_1.Post)('/api/player'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], PlayerController.prototype, "addPlayer", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map