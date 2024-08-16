import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent implements OnInit {
  article!: Article;

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; // or params.id
      console.log(id); // Access the id here
      // Use the id to fetch article details
      this.articleService.getArticleById(id).subscribe(response => {
        this.article = response;
      })
    });
  }
}
