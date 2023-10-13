Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default
    Given a user had selected a city and the list of upcoming events in that city is displayed;
    When the user selects an event;
    Then the user should see a collapsed event with summarized information.

  Scenario:: User can expand an event to see details.
    Given an event selected by the user in the list of upcoming event displayed;
    When the user clicks on “show details”;
    Then the user should receive an expanded view of the event with detailed information.

  Scenario:: User can collapse an event to hide details.
    Given a user had expanded and event to see details
    When the user click on “Hide details”
    Then the user should see a collapsed view of the event with summarized details