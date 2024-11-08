import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListsComponent } from './posts/post-lists/post-lists.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';

const routes: Routes = [
  { path: '', component: PostListsComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'edit/:postId', component: CreatePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
 