import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {

  searchbar = document.querySelector('ion-searchbar')
  items = ['Hello', 'One', 'Two'];
  inList: boolean = false;
  constructor() {

    // this.searchbar.addEventListener('ionInput', this.handleInput);
  }

  ngOnInit() {
  }

  handleInput(event) {
    this.initializeItems();

    // set val to the value of the searchbar
    const val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.inList = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.inList = false;
    }
  }

  initializeItems() {

  }
}
