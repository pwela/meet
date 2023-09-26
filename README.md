# meet_app

This is a serverless progressive web application (PWA) built with React and using a test drivent developemnt technique (TDD).

# technologies used

- create-react-app (CRA)
- AWS lambda

# Tests scenarios using the Gherkin ("Given-When-Then")

Feature 1: Filter Events By City

- SCENARIO 1: When user hasn’t searched for a specific city, show upcoming events from all cities.
  o Given user hasn’t searched for any city;
  o When the user opens the app;
  o Then the user should see a list of upcoming events.

- SCENARIO 2 :User should see a list of suggestions when they search for a city.
  o Given the main page is open;
  o When user starts typing in the city textbox;
  o Then the user should receive a list of cities (suggestions) that match what they’ve typed.
- SCENARIO 3: User can select a city from the suggested list.
  o Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
  o When the user selects a city (e.g., “Berlin, Germany”) from the list;
  o Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

Feature 2: Show/Hide Event Details

- SCENARIO 1: An event element is collapsed by default
  o Given a user had selected a city and the list of upcoming events in that city is displayed;
  o When the user selects an event;
  o Then the user should see a collapsed event with summarized information.

- SCENARIO 2: User can expand an event to see details.
  o Given an event selected by the user in the list of upcoming event displayed;
  o When the user clicks on “show details”;
  o Then the user should receive an expanded view of the event with detailed information.

- SCENARIO 3: User can collapse an event to hide details.
  o Given a user had expanded and event to see details
  o When the user click on “Hide details”
  o Then the user should see a collapsed view of the event with summarized details

Feature 3: Specify Number of Events

- SCENARIO 1: When user hasn’t specified a number, 32 events are shown by default
  o Given a list of upcoming events is displayed;
  o When the user doesn’t specify a number of events to display;
  o Then the user should receive 32 upcoming events in that city by default.

- SCENARIO 2: User can change the number of events displayed
  o Given a list of upcoming events is displayed;
  o When the user specifies a number of events to display;
  o Then the user should receive a list of the same specified number of upcoming events.

Feature 4: Use the App When Offline

- SCENARIO 1: Show cached data when there’s no internet connection.
  o Given the user’s device is not connected to the internet;
  o When the user’s searches for a previously displayed city or opens home screen;
  o Then the user should see the last corresponding information collected when online.

- SCENARIO 2: Show error when user changes search settings (city, number of events).
  o Given the user’s device is not connected to the internet;
  o When the user performs a new search or updated search settings;
  o Then the user should see an error message.

Feature 5: Add an App Shortcut to the Home Screen

- SCENARIO 1: User can install the meet app as a shortcut on their device home screen.
  o Given the main page is open;
  o When the user selects “Add shortcut to home screen” in the browser;
  o Then a shortcut of the app should be displayed on user’s device home screen.

Feature 6: Display Charts Visualizing Event Details

- SCENARIO 1: Show a chart with the number of upcoming events in each city.
  o Given the user hasn’t searched for a city;
  o When the user opens de app;
  o Then the user should see a chart showing the number of events in each city
