import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment/environment";
import { BehaviorSubject, Subscription, first } from "rxjs";
import { Whiteboard } from "../entities/whiteboard.entity";


interface CreateWhiteboard {
    roomId: string;
    name: string;
    description?: string;
    userId?: string;
}
@Injectable({
    providedIn: 'root'
})
export class WhiteboardService {

    currentUserSubscription!: Subscription;
    currentUser: any;
    constructor(private authenticationService: AuthenticationService,
        private router: Router,
        private http: HttpClient
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user) => {
            if (user) {
                this.currentUser = user;
            }
        });
     }

    private _whiteboardData: BehaviorSubject<Whiteboard> = new BehaviorSubject<Whiteboard>({
        _id: '',
        roomId: '',
        name: '',
        toDataUrl: '',
    });
    public get whiteboardData() {
        return this._whiteboardData.asObservable();
    }
    createWhiteboard(data: CreateWhiteboard) {
        const url = environment.apiUrl + '/whiteboard';
        if (!this.currentUser) {
            this.router.navigate(['/auth']);
            throw new Error('User not found');
        }
        data.userId = this.currentUser.id;
        return this.http.post(url, data).subscribe(response => {
            this.router.navigate(['/draw', data['roomId']]);
        });
    }

    joinWhiteboard(roomId: string) {
        const url = environment.apiUrl + `/whiteboard/${roomId}`;
        return this.http.get(url).subscribe((response: any) => {
            console.log("joinWhiteboard_response", response);
            if (!response.data) {
                throw new Error('whiteboard not found');
            }
            this._whiteboardData.next(response.data);
            this.router.navigate(['/draw', roomId]);
        });
    }

    fetchWhiteboardWithRoomId(roomId: string) {
        const url = environment.apiUrl + `/whiteboard/${roomId}`;
        return this.http.get(url).subscribe((response: any) => {
            console.log("fetchWhiteboardWithRoomId_response", response);
            if (!response.data) {
                throw new Error('whiteboard not found');
            }
            this._whiteboardData.next(response.data);
        });
    }

    ngOnInit(): void {
      
    }
    ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}