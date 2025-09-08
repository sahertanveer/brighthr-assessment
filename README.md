# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## TODOs / Future Improvements

1. Migrate to Vite
    a. Current setup uses CRA (react-scripts) which shows Webpack deprecation warnings.
    b. Migration to Vite will improve build speed, dev server performance, and reduce bundle size.

2. Add Routing
    a. Currently App.tsx renders a single Absences page.
    b. For scalability, add React Router with routes for Absences, Conflicts, Employee details, etc.

3. Improve Test Coverage
    a. While Redux slices and integration flows are tested, add component tests for:
        i. AbsenceTable
        ii. AbsenceFilters
        iii. Pagination.

4. Server-side Pagination
    a. Currently, all absences are fetched at once (20 records in this dataset).
    b. In a real-world app with thousands of records, implement server-side pagination and possibly data reshaping for efficiency.

5. Aggregate Conflict Data
    a. Conflict information is fetched per absence ID (one request per item). Ideally, backend should aggregate conflict info with absence data to reduce API calls.

6. Type Safety Improvements
    a. Add stricter TypeScript types where possible (e.g., for Redux actions, API responses).
    b. Use yup or somehing else for API data validation to prevent runtime issues.

7. Performance Optimizations
    a. Lazy load large components (e.g., ConflictsPanel, EmployeeAbsencesPanel).

8. UI Enhancements
    a. Add loading skeletons or placeholders instead of plain “Loading…” text for better user experience.
    b. Provide clear alerts on empty states or API errors.