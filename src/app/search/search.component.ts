import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  search(event: any, gifValue: string) {
    if (gifValue !== '' && event.code !== "Backspace") {
      this.dataService.searchGifs(gifValue);
    }
  }

}
