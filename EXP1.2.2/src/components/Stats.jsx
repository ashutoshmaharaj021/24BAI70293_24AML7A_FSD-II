import { useSelector } from "react-redux";

import {
  selectPostStatistics,
} from "../features/posts/postsSlice";

function Stats() {
  const stats = useSelector(
    selectPostStatistics
  );

  const cards = [
    {
      label: "Total Posts",
      value: stats.total,
      icon: "📝",
    },

    {
      label: "Drafts",
      value: stats.drafts,
      icon: "📄",
    },

    {
      label: "Published",
      value: stats.published,
      icon: "✓",
    },

    {
      label: "Scheduled",
      value: stats.scheduled,
      icon: "⏰",
    },

    {
      label: "Total Engagement",
      value:
        stats.engagement.toLocaleString(),
      icon: "📈",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div
          className="stat-card"
          key={card.label}
        >
          <div className="stat-icon">
            {card.icon}
          </div>

          <div>
            <span>{card.label}</span>

            <strong>{card.value}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stats;