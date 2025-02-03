export interface Player {
    id: string;
    rank?: number;
}
export interface Match {
    winner: string;
    loser: string;
    draw?: boolean;
}
export declare class AppService {
    private data;
    private players;
    private matches;
    getHello(): string;
    getData(): string;
    getPlayers(): Player[];
    addPlayer(player: Player): any;
    getAvgRank(): number;
    getMatches(): Match[];
    addMatch(match: Match): any;
    getProba(playerRank: number, advRank: number): number;
    getRanking(): Player[];
}
