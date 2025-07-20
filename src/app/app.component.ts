import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReviewComponent } from "./components/review/review.component";
import { ChatbotComponent } from "./components/chatbot/chatbot.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  title = 'bikya-frontend';
}
