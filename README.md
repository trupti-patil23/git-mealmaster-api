# Project Title
    Meal Master: Your Ultimate Companion For Effortless Meal Planning, Recipes and Grocery Shopping List

## Overview
    Meal Master is a web application designed to assist users in planning their meals for a week(Sunday to Saturday) by browsing recipes from external APIs. Users can create meal plans (Breakfast, Lunch and Dinner), generate grocery lists based on their plans, download meal plans and Grocery list and access their previous plans even after logging out. User can manage their profiles, meal plans through user authentication. Users can sign up using their email address and password and securely log in/out of the application.

### Problem

Meal Master application addresses below mentioned user's pain points and provides easy solutions while planning.
1. Time Constraints:
    Users struggle to find time to plan meals amidst busy schedules. This application helps user to create customized meal plans quickly and generate shopping list which helps user to save time.

2. Improve Health:
    Maintaining a healthy diet can be challenging without proper planning. With the Meal Master, users can select recipes based on their dietary preferences, ensuring they meet their nutritional needs and align with their health goals.

3. Organization and Convenience:
    Traditional meal planning methods, such as pen and paper, can be cumbersome and disorganized. The application offers a digital platform where users can organize their meal plans efficiently, access them from anywhere, download the meal plan, can edit plan anytime. Users don’t need to spend extra time for creating grocery list. This application will generate the list for users and user can also download it for shopping.

4. User Engagement and Accountability: 
    By allowing users to save and track their meal plans, the application promotes accountability and encourages consistent meal planning habits. Also users can save their time by reusing previous meal plans.

### User Profile

    Users of this application could be anyone looking to plan their meals more effectively, such as busy professionals, families, students, or individuals with dietary restrictions. 

### Features

1.  User Authentication:
        Implemented Sign up, Sign in, and log out functionality with email and password 
        User authentication implemented using JWT tokens. Upon successful login, a token will be generated at server side and stored in the client's local storage. This token will be sent with each subsequent request to authenticate the user.
        User profile management with the option to upload profile images.
      
2.  Create Meal Plan:
        When the user clicks on this tab, they can choose a single meal type from the available options (Breakfast, Lunch, or Dinner) using radio buttons. Based on their selection, a list of menus (displaying images and names) and an option to add recipes to the meal plan (+) will be presented.
        For instance, if the user selects "Breakfast," they can pick a breakfast recipe and allocate it to a specific day of the week from a dropdown menu (Sunday to Saturday). Subsequently, a table will be displayed with rows representing Breakfast, Lunch, and Dinner, and columns representing Sunday through Saturday. The table will show the chosen menu names corresponding to the selected row and column.        

3.  View Meal Plan:
        Display the user's meal plan table with selected menu , with the Download Meal Plan,Download Ingredients and Delete Meal Plan. User can see multiple saved meal plans with options.
        
        
## Implementation
### Tech Stack

Frontend:
    React for building the user interface.
    HTML and CSS with BEM methodology for styling.
    Axios for handling API requests.
    Java Script

Backend:
    Express.js and Node.js for server-side development.
    MySQL Server for database.
    Postman to test and verify database calls.

Authentication:
    JWT (JSON Web Tokens) for user authentication.

### APIs

    Recipe API: MealDB API for accessing recipe information. 
    
### Sitemap

    Refer attached screenshots stored at src/assets/screenshots, from https://github.com/trupti-patil23/git-mealmaster.git repository.
    
    Upon launching the application, users are greeted with the MealMaster logo and options to sign in or sign up, along with a footer. The sign-in page is initially displayed by default (Refer SignIn.png). Users can access the sign-up(Refer SignUp.png) page via the navigation bar menu.

    HomePage: Upon successful login, users are directed to the homepage(Refer HomePage.png), which features options to "Create Meal Plan" and "View Meal Plan," along with a profile image for accessing "Profile" and "Logout" functionalities. This page serves as a welcoming interface, guiding users through the application's steps.

    Create Meal Plan: This page is used to Ceate weekly meal Plan.(Refer CreateMealPlan.png)

    View Meal Plan: This page shows all saved meal plans for user. (Refer ViewMealPlan.png)

    Profile:This page allows users to change User Profile Image and Logout from application.(Refer UserProfilePage.png)

### Endpoints
    /users/register (POST): Register a new user.
    /users/login (GET) : Authorize user,verify if present in users table
    /users/profile (GET) : Get User Profile Data
    /users/uploadPhoto (POST) :  Saves User profile image on server   
    /login (POST): Log in an existing user.
     /meals/saveMealPlan(POST) : Saves meal Plans to Users table
    /meals/viewMealPlan (GET) : Get all saved meal plans
    /meals/deleteMealPlan (DELETE) : Delete selected meal Plan
    https://www.themealdb.com/api/json/v1/filter.php/?c='<category>' (GET): Get recipes from external API as per category
     https://www.themealdb.com/api/json/v1/lookup.php/?i='<RecipeId>'


 ## SetUp

    Clone the repository:
    ```bash
    git clone https://github.com/trupti-patil23/git-mealmaster-api.git

    Install dependencies:
        npm install

    Database Setup:
        CREATE SCHEMA `knex_mealmaster` 

        Run the migration: This will create "users" and "meal_plans" tables.
        npx knex migrate:latest   

        For Rollback :
        npx knex migrate:rollback 

        Environment Variables:
        Ensure you have set up all necessary environment variables. Create a .env file in the root directory and add your environment variables there

## Demo 

    Refer below link to start MealMaster Application,
    https://planwithmealmaster.netlify.app

## Nice-to-haves

    Using InstaCart Connect API, implement functionality to add grocery list to InstaCart Shopping site.    
    Integration with nutrition APIs to provide nutritional information for meals.
    Responsiveness for Mobile and tablet breakpoints.



