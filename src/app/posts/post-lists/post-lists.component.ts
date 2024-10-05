import { Component } from '@angular/core';

@Component({
  selector: 'app-post-lists',
  templateUrl: './post-lists.component.html',
  styleUrl: './post-lists.component.css'
})
export class PostListsComponent {

  posts = [
    {Title: 'First Post', content:'this is for the first'},
    {Title: 'Second Post', content:'this is for the second'},
    {Title: 'Thrid Post', content:'this is for the thrid'},
  ]
}
