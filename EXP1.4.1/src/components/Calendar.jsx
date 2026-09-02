import { memo, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar({
  posts,
  onEventClick,
  onEventDrop,
  onEventResize,
}) {
  /*
   * useMemo prevents the events array from being
   * recreated unnecessarily.
   */
  const events = useMemo(() => {
    console.log("Calendar events recalculated");

    return posts.map((post) => ({
      id: post.id,
      title: `${post.platform}: ${post.title}`,
      start: post.date,
      end: post.end,

      extendedProps: {
        platform: post.platform,
        description: post.description,
      },
    }));
  }, [posts]);

  console.log("Calendar rendered");

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable={true}
        selectable={true}
        eventClick={onEventClick}
        eventDrop={onEventDrop}
        eventResize={onEventResize}
        height="auto"
      />
    </div>
  );
}

export default memo(Calendar);