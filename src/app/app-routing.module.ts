import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'article',
    component: ArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'article-form',
    component: ArticleFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'article-view/:id',
    component: ArticleViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
