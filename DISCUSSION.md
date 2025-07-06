issues fixed and improvements made:
1. improve the API endpoint by adding pagination and search functionality. This would allow for better performance and a better user experience.
2. used tailwind on the page to make it look better, added a table and some styling using tailwind.
3. added pagination and search functionality to the page.
4. added a reset button to the search functionality.
5. created a pagination component to make it easier to navigate the advocates.
6. created a Specialties component to display the specialties of each advocate.
7. resolve antipatterns in code where raw javascript listeners were used instead of react hooks or state management.
8. use database instead of fake data


Things I would do to improve this app given more time:

1. fix type errors in route.ts (not an expert with Drizzle. I was able to get it to work but not sure if it's the best way)
2. improve the search functionality to search on more fields
3. improve pagination to show total number of advocates and allow for choosing page size
4. debounce the search functionality to prevent too many requests
5. add loading states and error handling
6. add unit tests and integration tests
7. add sorting functionality
