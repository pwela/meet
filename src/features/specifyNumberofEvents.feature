Feature: Specify Number of Events
  Scenario: When user hasn’t specified a number, 32 events are shown by default
    Given a list of upcoming events is displayed;
    When the user doesn’t specify a number of events to display;
    Then the user should receive 32 upcoming events in that city by default.

  Scenario: User can change the number of events displayed
    Given a list of upcoming events is displayed;
    When the user specifies a number of events to display;
    Then the user should receive a list of the same specified number of upcoming events.