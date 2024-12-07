import { Component, OnInit } from '@angular/core';
import { Extra } from './extra.model';
import { Subscription } from 'rxjs';
import { ExtraService } from './extra.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.css',
})
export class ExtraComponent implements OnInit{
  extra: Extra = { message: '', status: '' };

  private extraSub: Subscription;

  constructor(private extraService: ExtraService) {
    this.extraSub = new Subscription();
  }

  ngOnInit(){

    this.extraService.getExtra();
    this.extraSub = this.extraService.getUpdateExtra().subscribe((extra)=>{
      this.extra = extra;
      console.log("from the console.extra",extra);
    });
  }


}
