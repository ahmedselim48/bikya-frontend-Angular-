import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IMessage } from '../../models/imessage';
import { ChatbotService } from '../../core/services/chatbot.service';
import hljs from 'highlight.js';
import { SafeHtmlPipe } from './safeHtml.pipe';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule ,SafeHtmlPipe],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements AfterViewChecked {

 messages: IMessage[] = [];
  userInput: string = '';
  darkMode: boolean = false;
  isLoading: boolean = false;

  constructor(private chatService: ChatbotService) {}

  ngAfterViewChecked() {
    hljs.highlightAll();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  scrollToBottom() {
    const el = document.getElementById('messages');
    if (el) el.scrollTop = el.scrollHeight;
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ role: 'user', content: this.userInput });
    const input = this.userInput;
    this.userInput = '';
    this.isLoading = true;

    try {
      const response = await this.chatService.ask(input).toPromise();
      const content = response.choices[0].message.content;

      this.messages.push({
        role: 'user',
        content: `<pre><code class="language-typescript">${content}</code></pre>`
      });
    } catch (error) {
      this.messages.push({
        role: 'assistant',
        content: '❌ حصل خطأ أثناء الاتصال بالخدمة.'
      });
      console.error(error);
    }

    this.isLoading = false;
    setTimeout(() => this.scrollToBottom(), 100);
  }
}
