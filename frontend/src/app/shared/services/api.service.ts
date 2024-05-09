import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {

    }
    async get(url: string) {
        return await this.http.get(url);
    }

    async post(url: string, body: any) {

        return await this.http.post(url, body);
    }
}