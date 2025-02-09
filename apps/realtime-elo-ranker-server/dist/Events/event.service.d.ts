import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class EventService {
    private eventEmitter;
    constructor();
    getEmitter(): EventEmitter2;
    emit(eventName: string, data: any): void;
}
