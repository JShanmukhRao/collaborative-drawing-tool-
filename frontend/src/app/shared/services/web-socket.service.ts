import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  {io} from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket: any;

    public connect(url: string): void {
        console.log('Connecting to the server');
        this.socket = io(url);

        this.socket.on('connect', () => {
            console.log('Connected to the server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });
    }

    public send(event: string, data: any): void {
        this.socket.emit(event, data);
    }

    public onEvent(event: string) {
        return new Observable((observer:any) => {
            this.socket.on(event,(data :any)=> observer.next(data));
        });
    }
    public disconnect(): void {
        this.socket.disconnect();
    }
}