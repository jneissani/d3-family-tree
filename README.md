# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Possible Enhancements
- Add options to customize the tree layout (horizontal/vertical, different colors, etc.)
- Implement data persistence using local storage or a backend API

Improvements
XX    Code Structure and Readability:
        Refactor the hasBirthdays and hasAnniversaries functions to reduce nesting and improve readability. Consider using early returns to simplify the logic.
        Use more descriptive variable names to clarify their purpose.
XX    Error Handling:
        Implement better error handling in the date parsing sections to gracefully manage invalid date formats or missing data.
XX    Performance Optimization:
        Use memoization techniques with useMemo or useCallback for functions that are called frequently, such as checkAnniversary, to avoid unnecessary recalculations.
    Responsive Design:
        Ensure that the family tree layout is responsive and adapts well to different screen sizes. This can be achieved by using CSS media queries or a responsive design library.

Features to Add
   Search Functionality:
        Implement a search bar that allows users to quickly find family members by name or other attributes.
    Add/Edit Family Members:
        Create forms for users to add new family members or edit existing ones. This could include fields for name, birth date, death date, and relationships.
    Export/Import Family Data:
        Allow users to export the family tree data as a JSON file and import it back into the app. This can facilitate sharing and backup of family information.
    User Authentication:
        Implement user authentication to allow multiple users to maintain their own family trees securely.
    Visual Enhancements:
        Add visual customization options for the family tree, such as different colors for different branches or themes.
        Consider integrating icons or images for family members to enhance visual appeal.
    Mobile App Version:
        Explore the possibility of creating a mobile app version using React Native for better accessibility on mobile devices.
    Family Events Calendar:
        Introduce a calendar feature that displays upcoming birthdays and anniversaries, allowing users to see important dates at a glance.
    Interactive Features:
        Enable users to click on family members to view their relationships and navigate through the family tree dynamically.
