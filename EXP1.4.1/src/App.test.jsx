import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import App from "./App";

vi.mock("@fullcalendar/react", () => ({
  default: ({
    events,
    eventClick,
    eventDrop,
    eventResize,
  }) => (
    <div>

      <div data-testid="calendar">
        Mock Calendar
      </div>

      {events.map((event) => (
        <button
          key={event.id}
          onClick={() =>
            eventClick({
              event: {
                id: event.id,
              },
            })
          }
        >
          {event.title}
        </button>
      ))}

      <button
        data-testid="drop-event"
        onClick={() =>
          eventDrop({
            event: {
              id: "1",
              start: new Date("2026-09-10T10:00:00"),
            },
          })
        }
      >
        Drop Event
      </button>

      <button
        data-testid="resize-event"
        onClick={() =>
          eventResize({
            event: {
              id: "1",
              start: new Date("2026-09-10T10:00:00"),
              end: new Date("2026-09-10T11:30:00"),
            },
          })
        }
      >
        Resize Event
      </button>

    </div>
  ),
}));

vi.mock("@fullcalendar/daygrid", () => ({
  default: {},
}));

vi.mock("@fullcalendar/timegrid", () => ({
  default: {},
}));

vi.mock("@fullcalendar/interaction", () => ({
  default: {},
}));

describe("Post Scheduler", () => {

  it("renders the calendar", () => {
    render(<App />);

    expect(
      screen.getByTestId("calendar")
    ).toBeInTheDocument();
  });

  it("renders scheduled posts", () => {
    render(<App />);

    expect(
      screen.getByText("Instagram: Instagram Reel")
    ).toBeInTheDocument();

    expect(
      screen.getByText("YouTube: YouTube Video")
    ).toBeInTheDocument();
  });

  it("opens post details when an event is clicked", () => {
    render(<App />);

    fireEvent.click(
      screen.getByText("Instagram: Instagram Reel")
    );

    expect(
      screen.getByText("Morning motivation reel")
    ).toBeInTheDocument();
  });

  it("closes the modal", () => {
    render(<App />);

    fireEvent.click(
      screen.getByText("Instagram: Instagram Reel")
    );

    expect(
      screen.getByText("Morning motivation reel")
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Close modal",
      })
    );

    expect(
      screen.queryByText("Morning motivation reel")
    ).not.toBeInTheDocument();
  });

  it("updates the post when it is dragged", () => {
    render(<App />);

    fireEvent.click(
      screen.getByTestId("drop-event")
    );

    fireEvent.click(
      screen.getByText("Instagram: Instagram Reel")
    );

    expect(
      screen.getByText(/9\/10\/2026/)
    ).toBeInTheDocument();
  });

  it("updates the post duration when resized", () => {
    render(<App />);

    fireEvent.click(
      screen.getByTestId("resize-event")
    );

    fireEvent.click(
      screen.getByText("Instagram: Instagram Reel")
    );

    expect(
      screen.getByText(/9\/10\/2026/)
    ).toBeInTheDocument();
  });

});