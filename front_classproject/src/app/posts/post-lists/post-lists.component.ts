import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-lists',
  templateUrl: './post-lists.component.html',
  styleUrl: './post-lists.component.css', 
})
export class PostListsComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postService: PostService) {
    this.postSub = new Subscription();
  }

  ngOnInit() { 
    this.postService.getPost();
    this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
      this.posts = posts; 
    });
  }

  onDelete(id: string){ 
    this.postService.deletePost(id);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
