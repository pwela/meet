import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  let EventComponent;

  beforeEach(() => {
    EventComponent = render(<Event />);
  });
  test("renders event information", async () => {
    // Mock data for an event
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);

    // Check if event details is rendered correctly
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
    expect(
      EventComponent.queryByText(Date(allEvents[0].created))
    ).toBeInTheDocument();
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
    // expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument;
  });
  test("renders event detail button with the title (Show details", () => {
    // const EventComponent = render(<Event />);
    expect(EventComponent.queryByText("Show details")).toBeInTheDocument();
  });

  test("event details section is hidden by default", () => {
    expect(EventComponent.queryByRole("region")).not.toBeInTheDocument();
  });
  test("show details section when the user clicks on the 'show detail' button", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    const showDetails = EventComponent.queryByText("Show details");
    await user.click(showDetails);
    const detailsSection = EventComponent.queryByRole("region");
    expect(detailsSection).toBeInTheDocument();
    expect(detailsSection).toHaveClass("details_section");
  });
  test("hide details section when user click on the 'Hide details' button", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    const showDetails = EventComponent.queryByText("Show details");
    await user.click(showDetails);
    const hideDetails = EventComponent.queryByText("Hide details");
    await user.click(hideDetails);
    const detailsSection = EventComponent.queryByRole("region");
    expect(detailsSection).not.toBeInTheDocument();
  });
});
