import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private socketUrl = 'wss://javascript.info/article/websocket/chat/ws';

  connect(): void {
    this.socket = new WebSocket(this.socketUrl);
    this.socket.onopen = () => console.log('WebSocket connected');
    this.socket.onmessage = (event) => console.log('Received:', event.data);
    this.socket.onerror = (error) => console.error('WebSocket error:', error);
    this.socket.onclose = () => console.log('WebSocket closed');
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  closeConnection(): void {
    this.socket.close();
  }
}
