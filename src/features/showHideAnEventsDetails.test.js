import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let AppComponent;
  //let EventComponent;
  let suggestionListItems;
  let EventListItems;
  let EventListDOM;
  let AppDOM;
  let citySearchInput;
  let CitySearchDOM;
  beforeEach(async () => {
    AppComponent = render(<App />);
    //const user = userEvent.setup();

    AppDOM = AppComponent.container.firstChild;
    CitySearchDOM = AppDOM.querySelector("#city-search");
    citySearchInput = within(CitySearchDOM).queryByRole("textbox");
  });
  test("An event element is collapsed by default", ({ given, when, then }) => {
    given(
      "a user had selected a city and the list of upcoming events in that city is displayed;",
      async () => {
        const user = userEvent.setup();
        // User types a city
        await user.type(citySearchInput, "Berlin");
        // User selects a city
        suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
        await user.click(suggestionListItems[0]);

        EventListDOM = AppDOM.querySelector("#event-list");
        EventListItems = within(EventListDOM).queryAllByRole("listitem");
        const allEvents = await getEvents();

        // filtering the list of all events down to events located in Germany
        // citySearchInput.value should have the value "Berlin, Germany" at this point
        const berlinEvents = allEvents.filter(
          (event) => event.location === citySearchInput.value
        );
        const berlinEventsSliced =
          berlinEvents.length > 32 ? berlinEvents.slice(0, 32) : berlinEvents;
        expect(EventListItems).toHaveLength(berlinEventsSliced.length);
        EventListItems.forEach((event) => {
          expect(event.textContent).toContain("Berlin, Germany");
        });
      }
    );

    when("the user selects an event;", async () => {
      const user = userEvent.setup();
      const EventComponent = EventListItems[0].querySelector(".event");
      await user.click(EventComponent);
    });

    then(
      "the user should see a collapsed event with summarized information.",
      async () => {
        const detailsSection = within(EventListItems[0]).queryByRole("region");
        expect(detailsSection).not.toBeInTheDocument();
      }
    );
  });

  test(": User can expand an event to see details.", ({
    given,
    when,
    then,
  }) => {
    given(
      "an event selected by the user in the list of upcoming event displayed;",
      async () => {}
    );

    when("the user clicks on “show details”;", async () => {
      const user = userEvent.setup();
      EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        EventListDOM = AppDOM.querySelector("#event-list");
        EventListItems = within(EventListDOM).queryAllByRole("listitem");

        // The first event will be selected
        expect(EventListItems[0]).toBeTruthy();
      });

      const detailsButton = within(EventListItems[0]).queryByText(
        "Show details"
      );
      await user.click(detailsButton);
    });

    then(
      "the user should receive an expanded view of the event with detailed information.",
      () => {
        const eventDetails = within(EventListItems[0]).queryByRole("region");
        expect(eventDetails).toBeInTheDocument();
      }
    );
  });

  test(": User can collapse an event to hide details.", ({
    given,
    when,
    then,
  }) => {
    given("a user had expanded and event to see details", async () => {
      const user = userEvent.setup();
      EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        EventListDOM = AppDOM.querySelector("#event-list");
        EventListItems = within(EventListDOM).queryAllByRole("listitem");
        // The first event will be selected
        expect(EventListItems[0]).toBeTruthy();
      });

      const detailsButton = within(EventListItems[0]).queryByText(
        "Show details"
      );
      await user.click(detailsButton);
      // The hide details button is displayed
      const hideDetailsButton = within(EventListItems[0]).queryByText(
        "Hide details"
      );
      expect(hideDetailsButton).toBeInTheDocument();
    });

    when("the user click on “Hide details”", async () => {
      const user = userEvent.setup();
      const hideDetailsButton = within(EventListItems[0]).queryByText(
        "Hide details"
      );
      await user.click(hideDetailsButton);
    });

    then(
      "the user should see a collapsed view of the event with summarized details",
      () => {
        const eventDetails = within(EventListItems[0]).queryByRole("region");
        expect(eventDetails).not.toBeInTheDocument();
      }
    );
  });
});
