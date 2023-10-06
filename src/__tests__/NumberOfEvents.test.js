import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOf Events /> component", () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNOE={() => {}} />
    );
  });
  test("render an element with role textbox and sets the defaulf value to 32", () => {
    const NumberOfEventsTextbox =
      NumberOfEventsComponent.queryByRole("textbox");
    expect(NumberOfEventsTextbox).toBeInTheDocument();
    expect(NumberOfEventsTextbox).toHaveValue("32");
  });
  test("Ensure NumberofEvent textbox component is updated when user types", async () => {
    const user = userEvent.setup();
    const NumberOfEventsTextbox =
      NumberOfEventsComponent.queryByRole("textbox");
    await user.type(NumberOfEventsTextbox, "{backspace}{backspace}10");
    expect(NumberOfEventsTextbox).toHaveValue("10");
  });
});
