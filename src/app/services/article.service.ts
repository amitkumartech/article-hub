import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Article } from '../models/article.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [];
  private nextId = "";
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  articles$: Observable<Article[]> = this.articlesSubject.asObservable();

  constructor(private commonService: CommonService) {
    this.getArticles().subscribe(response => {
      this.articles = response;
    }); // Load articles on service initialization
  }

  getArticles(): Observable<Article[]> {
    // Check for articles in localStorage
    const articlesString = localStorage.getItem('articles');
    let articles: Article[] = [];

    if (articlesString) {
      articles = JSON.parse(articlesString) as Article[];
      this.articles = articles;
    }

    // Update the BehaviorSubject with the fetched articles
    this.articlesSubject.next(articles);

    return this.articles$;
  }

  addArticle(article: Article): Observable<Article> {
    article.id = this.commonService.generateGuid();

    // Update the local articles list and BehaviorSubject
    this.articles.push(article);
    this.articlesSubject.next(this.articles);

    // Save the updated articles list to localStorage
    const articlesString = JSON.stringify(this.articles);
    localStorage.setItem('articles', articlesString);

    return of(article);
  }

  getArticleById(id: string): Observable<Article> {
    const d = {
      id: "",
      title: "string",
      content: "string",
      author: "string",
      publishedAt: new Date()
    }
    // Replace this with your actual data fetching logic
    const article = this.articles.find(article => article.id.toString() === id.toString()) || d;
    return of(article); // Return null if article not found
  }

}
