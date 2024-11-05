import { Component } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {

  constructor(public postService: PostService){

  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    } 
    
    this.postService.addPosts(form.value.title, form.value.content)
    form.resetForm( )
  }
} 
