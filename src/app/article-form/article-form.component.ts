import { Component, EventEmitter, OnDestroy, OnInit, Output, SecurityContext } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  @Output() articleCreated = new EventEmitter<Article>();
  articleForm: FormGroup;
  editor!: Editor;
  html = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private fb: FormBuilder,
    private articleservice: ArticleService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit() {
    console.log(this.html);
    console.log(this.editor);
    if (this.articleForm.valid) {
      const article: Article = this.articleForm.value;
      const d = this.sanitizeHtmlContent(this.articleForm.get('content')?.value);
      article.content = d;
      article.publishedAt = new Date(); // Add publishedAt here
      this.articleservice.addArticle(article).subscribe(response => {
        console.log(response);

      })
      console.log("articled published!");

      this.articleForm.reset();
    }
  }

  public sanitizeHtmlContent(htmlstring: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, htmlstring) || "";
  }

}
