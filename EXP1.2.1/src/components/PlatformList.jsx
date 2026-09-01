import { useSelector } from "react-redux";

import {
  selectAllPlatforms,
} from "../features/platforms/platformsSlice";

function PlatformList() {
  const platforms =
    useSelector(selectAllPlatforms);

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Platforms</h2>

          <p>
            Platform configuration from global state.
          </p>
        </div>
      </div>

      <div className="platform-list">
        {platforms.map((platform) => (
          <div
            className="platform-item"
            key={platform.id}
          >
            <div
              className="platform-icon"
              style={{
                backgroundColor:
                  platform.color,
              }}
            >
              {platform.icon}
            </div>

            <div>
              <strong>
                {platform.name}
              </strong>

              <span>
                {platform.characterLimit.toLocaleString()}{" "}
                character limit
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PlatformList;