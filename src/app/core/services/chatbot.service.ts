import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from '../../models/imessage';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
private apiKey = 'https://localhost:65162/api/Chat'; 

  constructor(private http: HttpClient) {}

  // sendMessage(message: string): Observable<IMessage> {
  //   return this.http.post<IMessage>(this.apiKey, { message });
  // }
  
  ask(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
      'HTTP-Referer': 'http://localhost:4200',
      'X-Title': 'ChatBotAngular'
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ]
    };

   return this.http.post<IMessage>(this.apiKey, { message });

  }


}
