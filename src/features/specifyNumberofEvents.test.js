import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/specifyNumberofEvents.feature");
defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 events are shown by default", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let EventListItems;
    let EventListDOM;

    given("a list of upcoming events is displayed;", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");
    });

    when("the user doesn’t specify a number of events to display;", () => {});

    then(
      "the user should receive 32 upcoming events in that city by default.",
      async () => {
        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(32);
        });
      }
    );
  });

  test("User can change the number of events displayed", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let EventListItems;
    let EventListDOM;
    given("a list of upcoming events is displayed;", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    when("the user specifies a number of events to display;", async () => {
      const user = userEvent.setup();
      const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
      const NumberOfEventsTextbox =
        within(NumberOfEventsDOM).queryByRole("textbox");

      await user.type(NumberOfEventsTextbox, "{backspace}{backspace}10");
    });

    then(
      "the user should receive a list of the same specified number of upcoming events.",
      () => {
        const EventListDOM = AppDOM.querySelector("#event-list");
        const allRenderedEventItems =
          within(EventListDOM).queryAllByRole("listitem");
        expect(allRenderedEventItems.length).toBe(10);
      }
    );
  });
});
