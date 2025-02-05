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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
let MatchController = class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }
    addMatch(match, res) {
        let result;
        try {
            result = this.matchService.addMatch(match);
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
        return this.matchService.getMatches();
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Post)('/api/match'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], MatchController.prototype, "addMatch", null);
__decorate([
    (0, common_1.Get)('/api/match'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MatchController.prototype, "getMatches", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
//# sourceMappingURL=match.controller.js.map