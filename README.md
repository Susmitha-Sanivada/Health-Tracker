# HealthTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

**Project Highlights**

1. NgRx is used for state management.
2. Unit Tests for app component, a service and a pipe are written with 100% code coverage.
3. Switch mode functionality is implemented where we can switch from dark mode to light mode and vice versa.
4. Refresh functionality is implemented to refresh the data to the default data after searching for a value or filtering the results.
5. A single page application with two routes and two components.

**Genreal**

1. To add more than one workout of the same username , click on the add more button.
2. Add button changes the app state and the change can be seen in the user_workoutes tab.
3. Search button searches for the value and return the searched data, in case if the search value is not found the default page data is loaded with an error msg on top for better user experience.
4. Filter option filters the data for the selected filter value, in case if the filter value doesn't update the data the default data is loaded with an error msg on top for better user experience.
5. Results per page functionality is implemented where the default per page value is always set to 5.
6. Pagination is also implemented where we can see the page buttons on the bottom with the prev and next button as well.
7. A message on the bottom shows us on which page are we exactly on out of whole page numbers.
   i.e..Page 1 of 2
8. The assignment has been done in the Angular 14+ framework.
9. Styling is done with Tailwind.
