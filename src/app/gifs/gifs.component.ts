import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Clipboard } from '@angular/cdk/clipboard'

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit, OnDestroy {

  gifs: any[] = [];
  subscription: Subscription;
  columnNumber: number = 4;
  showSnackBar: boolean = false;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private clipBoard: Clipboard) { }

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
      case windowSize > 2400:
        this.columnNumber = 5;
        break;
      case windowSize > 3200:
        this.columnNumber = 6;
        break;
    }
  }

  copyToClipboard(event: any) {
    this.clipBoard.copy(event);
    this.snackBar.open("Copied to clipboard", "copy", {
      duration: 2000,
    });
  }

  openSnackBar(message: string, action: string) {

  }
}
