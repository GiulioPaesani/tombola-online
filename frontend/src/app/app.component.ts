import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import axios from 'axios';
import { WebSocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  text = '';

  constructor(private webSockerService: WebSocketService) {
    // this.text = webSockerService.test;
  }

  sendRequest = () => {
    axios.post('http://localhost:5000/test').then((response) => {
      this.text = response.data;
      setTimeout(() => (this.text = ''), 2000);
    });
  };

  sendMessage() {
    this.webSockerService.sendMessage({
      text: 'Messaggio dal FRONTEND',
    });
  }

  ngOnInit() {
    this.webSockerService.getMessage()?.subscribe((message) => {
      // this.text = `Messaggio ricevuto: "${message.text}"`;
      console.log('[Frontend] Messaggio ricevuto:', message.toString());
    });
  }
}
