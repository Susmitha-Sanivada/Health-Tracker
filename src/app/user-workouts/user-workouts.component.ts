import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectData } from '../store/selectors';
import { data, payloadData, userData, workout } from '../model';
import { Observable, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../services/workout.service';
import { WorkoutStringPipe } from '../pipes/workout.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-workouts',
  standalone: true,
  imports: [CommonModule, WorkoutStringPipe, FormsModule],
  templateUrl: './user-workouts.component.html',
  styleUrl: './user-workouts.component.scss',
})
export class UserWorkoutsComponent implements OnInit, OnDestroy {
  toggle!: boolean;
  toggleSubscription!: Subscription;
  filterValue!: string;
  searchValue!: string;
  data!: Observable<data>;
  storedData!: Observable<data>;
  errorMsg!: string;
  pagesArray!: number[];
  perPage!: number;
  page: number = 1;
  disable: boolean = false;
  searchTrue: boolean = false;

  constructor(private store: Store, private service: WorkoutService) {}
  //
  //

  ngOnInit(): void {
    // set default values and load data
    this.setDefault();

    // listening to the toggle value
    this.toggleSubscription = this.service.toggle$.subscribe((data) => {
      this.toggle = data;
    });
  }
  //
  //

  onSearch() {
    // set the default values
    this.setDefault();
    // use search method in the service to filter the data
    this.data = this.service.searchByName(this.searchValue, this.storedData);

    const errorStr =
      'No data which matches the searched value, try a different one!!!';
    // error handling if there is no search value in the data
    this.toogleData(this.data, this.storedData, errorStr);

    // set default
    this.searchValue = '';
  }
  //
  //

  onFilter() {
    // use the filterbyworkout method in service to filter the data
    this.data = this.service.filterByWorkout(this.filterValue, this.storedData);

    const errorStr =
      'No data which matches the filter value, try a different one!!!';
    // error handling if there is no data of the filter value
    this.toogleData(this.data, this.storedData, errorStr);
  }
  //
  //
  onRefresh() {
    //  setting all the default values again
    this.setDefault();
  }
  //
  //

  onPage() {
    // set the default filter value to ""
    this.filterValue = '';
    this.page = 1;
    // on clicking a page option load the data of the first page
    this.loadData(this.storedData);
  }
  //
  //

  onClickPage(page: number) {
    // set the page to the clicked page
    this.page = page;
    // console.log(this.page, this.pagesArray, this.filterValue);

    if (this.searchTrue) {
      this.loadData(this.data);
    } else {
      this.loadData(this.storedData);
    }
    // console.log(this.page, this.pagesArray, this.filterValue);
  }
  //
  //

  onPrev() {
    if (this.pagesArray.length > 1 && this.page > 1) {
      this.page = this.page - 1;
      this.loadData(this.storedData);
    }
  }
  //
  //
  onNext() {
    if (this.pagesArray.length > 1 && this.page < this.pagesArray.length) {
      this.page = this.page + 1;
      this.loadData(this.storedData);
    }
  }

  //
  //
  // setting the defaultvalues and loading the default data

  setDefault() {
    this.disable = false;
    this.filterValue = '';
    this.searchTrue = false;
    this.perPage = 5;
    this.page = 1;
    this.errorMsg = '';
    // store the data in two properties one changes and one is the default value
    this.storedData = this.store.select(selectData);
    this.data = this.storedData;
    this.loadData(this.data);
  }
  //
  //

  //
  // load the data from the service using pagination
  loadData(currentData: Observable<data>) {
    this.service
      .pagination(currentData, this.perPage)
      .subscribe((data) => (this.pagesArray = data));

    this.data = this.service.loadPageData(currentData, this.page, this.perPage);
  }
  //

  //
  //
  // loads default data if the filter value or search value gets the data of length 0
  toogleData(
    currentData: Observable<data>,
    defaultData: Observable<data>,
    errorStr: string
  ) {
    currentData.subscribe((data) => {
      if (data.length === 0) {
        // this.setDefault();
        this.loadData(defaultData);
        this.errorMsg = errorStr;
        this.filterValue = '';
        this.searchTrue = false;
      } else {
        this.errorMsg = '';
        this.searchTrue = true;
        this.loadData(currentData);
        this.disable = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.toggleSubscription) {
      this.toggleSubscription.unsubscribe();
    }
  }
}
