import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit, OnDestroy {

  gifs: any[] = [];
  subscription: Subscription;
  columnNumber: number = 4;
  showSnackBar:boolean = false;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataService.getTrendingGifs();
    this.subscription = this.dataService.getGifs().subscribe((response: any) => {
      this.gifs = response;
    })
    this.onResize(window.innerWidth)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onResize(windowSize: number) {
    switch (true) {
      case windowSize <= 480:
        this.columnNumber = 1;
        break;
      case windowSize >= 480 && windowSize <= 1070:
        this.columnNumber = 2;
        break;
      case windowSize >= 1070 && windowSize < 1600:
        this.columnNumber = 3;
        break;
      case windowSize > 1600:
        this.columnNumber = 4;
        break;
    }
  }

  copyToClipboard(event: any) {
    this.snackBar.open("Copying image", "copy", {
      duration: 2000,
   });
  }

  openSnackBar(message: string, action: string) {
   
 } 
}
