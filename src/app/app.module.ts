import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticleComponent } from './article/article.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from './login/login.component';
import { NoContentComponent } from './no-content/no-content.component' 
@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleViewComponent,
    ArticleFormComponent,
    LoginComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
