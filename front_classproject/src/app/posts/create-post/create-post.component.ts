import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  post: Post = { id: '', title: '', content: '' };
  isLoading: boolean = false;
  private mode: string = 'create';
  private postId: string = '';

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        console.log('edit');
        this.mode = 'edit';
        this.postId = <string>paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPostById(this.postId).subscribe((post) => {
          this.isLoading =false;
          this.post = {
            id: post._id,
            title: post.title,
            content: post.content,
          };
        });
        // console.log(this.post);
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPosts(form.value.title, form.value.content);
      form.resetForm();
    } else {
      this.postService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
      console.log('update');
    }
    form.resetForm();
  }
}
