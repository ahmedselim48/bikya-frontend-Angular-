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
  isDarkMode: boolean = false;
  isLoading: boolean = false;

  constructor(private chatService: ChatbotService) {}

  ngAfterViewChecked() {
    hljs.highlightAll();
  }

 
toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;

  if (this.isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
  scrollToBottom() {
    const el = document.getElementById('messages');
    if (el) el.scrollTop = el.scrollHeight;
  }

  sendMessage() {
  if (!this.userInput.trim()) return;

  this.messages.push({ role: 'user', content: this.userInput });

  const input = this.userInput;
  this.userInput = '';
  this.isLoading = true;

  this.chatService.ask(input).subscribe({
  next: (response) => {
    const content = response.response;

    const isCode = content.includes("```") || content.includes("class ") || content.includes("function ") || content.includes("public ") || content.includes("const ") || content.includes("{") || content.includes(";");

    this.messages.push({
      role: 'assistant',
      content: isCode
        ? `<pre><code class="language-typescript">${content}</code></pre>`
        : content
    });

    this.isLoading = false;
    setTimeout(() => this.scrollToBottom(), 100);
  },
  error: (error) => {
    this.messages.push({
      role: 'assistant',
      content: '❌ حصل خطأ أثناء الاتصال بالخدمة.'
    });
    console.error(error);
    this.isLoading = false;
  }
});

}

}
