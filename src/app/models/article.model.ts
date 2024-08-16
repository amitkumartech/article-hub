import { SafeHtml } from "@angular/platform-browser";

export interface Article {
  id: string;
  title: string;
  content: SafeHtml;
  author: string;
  publishedAt: Date;
}
