import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListsComponent } from './posts/post-lists/post-lists.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './auth/auth.guard';
import { ExtraComponent } from './extra/extra.component';

const routes: Routes = [
  { path: '', component: PostListsComponent },
  { path: 'create', component: CreatePostComponent, canActivate: [authGuard] },
  { path: 'edit/:postId', component: CreatePostComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'extra', component: ExtraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
