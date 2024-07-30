import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectData } from '../store/selectors';
import { data } from '../model';
import { Observable } from 'rxjs';
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

  //
  //

  onFilter() {
    this.page = 1;

    this.findFilterData(this.filterValue, this.data, this.storedData);
  }
  //
  //
  onRefresh() {
    //  setting all the default values again
    this.setDefault();
  }
  //
  //

  onSetPage() {
    this.page = 1;
    // on clicking a page option load the data of the first page
    if (this.filterValue.length) {
      this.findFilterData(this.filterValue, this.data, this.storedData);
    } else if (!this.searchTrue) {
      this.loadPagesArray(this.storedData);
      this.loadViewData(this.storedData);
    }
  }
  //
  //

  onClickPage(page: number) {
    // set the page to the clicked page
    this.page = page;
    if (this.filterValue.length) {
      this.findFilterData(this.filterValue, this.data, this.storedData);
    } else if (!this.searchTrue) {
      // no need of changing the pages array
      this.loadViewData(this.storedData);
    }
  }
  //
  //

  onPrev() {
    this.onPageChange('onPrev');
  }
  //
  //
  onNext() {
    this.onPageChange('onNext');
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
  // setting the defaultvalues and loading the default data

  setDefault() {
    this.filterValue = '';
    this.searchTrue = false;
    this.perPage = 5;
    this.page = 1;
    this.errorMsg = '';
    // store the data in two properties one changes and one is the default value

    // at this time both the datas are same

    // change the this.data whenever required and store the whole data in the this.storeddata property
    this.storedData = this.store.select(selectData);
    this.data = this.storedData;
    this.loadPagesArray(this.storedData);
    this.loadViewData(this.storedData);
  }
  //
  //

  //
  // load the data from the service using pagination

  //

  loadPagesArray(loadedData: Observable<data>) {
    this.service
      .pagination(loadedData, this.perPage)
      .subscribe((data) => (this.pagesArray = data));
  }

  loadViewData(loadedData: Observable<data>) {
    this.data = this.service.loadPageData(loadedData, this.page, this.perPage);
  }

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
        this.loadPagesArray(defaultData);
        this.loadViewData(defaultData);
        this.errorMsg = errorStr;
        this.filterValue = '';
        this.page = 1;
        this.searchTrue = false;
      } else {
        this.errorMsg = '';
        this.searchTrue = true;
        this.loadPagesArray(currentData);
        this.loadViewData(currentData);
      }
    });
  }

  findFilterData(
    filterVal: string,
    currentData: Observable<data>,
    defaultData: Observable<data>
  ) {
    // use the filterbyworkout method in service to filter the data
    currentData = this.service.filterByWorkout(filterVal, defaultData);
    const errorStr =
      'No data which matches the filter value, try a different one!!!';
    // error handling if there is no data of the filter value
    this.toogleData(currentData, defaultData, errorStr);
  }

  onPageChange(pageChange: string) {
    if (pageChange === 'onNext') {
      if (this.pagesArray.length > 1 && this.page < this.pagesArray.length) {
        if (!this.searchTrue) {
          this.page = this.page + 1;
          this.loadViewData(this.storedData);
        } else if (this.filterValue) {
          this.page = this.page + 1;
          this.findFilterData(this.filterValue, this.data, this.storedData);
        }
      }
    } else if (pageChange === 'onPrev') {
      if (this.pagesArray.length > 1 && this.page > 1) {
        if (!this.searchTrue) {
          this.page = this.page - 1;
          this.loadViewData(this.storedData);
        } else if (this.filterValue) {
          this.page = this.page - 1;
          this.findFilterData(this.filterValue, this.data, this.storedData);
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.toggleSubscription) {
      this.toggleSubscription.unsubscribe();
    }
  }
}
