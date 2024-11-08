import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPost() {
    // return this.posts; // by reference
    // return [...this.posts]; // copy of the list post
    this.http
      .get<{ success: boolean; data: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.data.map((payLoad: any) => {
            return {
              title: payLoad.title,
              content: payLoad.content,
              id: payLoad._id,
            };
          });
        })
      )
      .subscribe((transformData) => {
        this.posts = transformData;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = { id: '', title: title, content: content };

    this.http
      .post<{ success:boolean, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        const postId = res.postId;
        post.id = postId;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/'+postId)
      .subscribe(()=>{
          this.posts = this.posts.filter(post=>post.id !=postId);
          this.postUpdated.next([...this.posts]);
      });
  }

}


