import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  newPost: any= 'No Content';
  enteredValue: any; //ndmodule variable

  onAddPost(){

    this.newPost = this.enteredValue;
    alert(this.newPost)
  }
}
