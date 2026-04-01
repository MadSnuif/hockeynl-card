class HockeyNLCard extends HTMLElement {
  // Whenever the state changes, a new hass object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    const config = this.config;
    const entityIdArray = config.entities; // Array of strings "sensor.sensor1", "sensor.sensor2"
    if (!this.content) {
      const title = this.title; // Card title
      this.innerHTML = `
        <ha-card header="${title}">
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector("div");
    }

    this.content.innerHTML = `
      <style>
        .team-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-style: solid;
          border-width: 1px; /*var(--ha-card-border-width,1px); */
          border-radius: 12px; /* var(--ha-card-border-radius,12px);*/
          padding: 4px 2px;

          border-color: #6e6e6e;  /*var(--divider-color,#e0e0e0);*/
          margin: 4px; /* seperation between the entities */
        }

        .team {
          text-align: center;
          width: 100%;
        }

        .team-logo {
          height: 50px;
          margin-bottom: 5px; /* Adjust as needed for spacing between image and name */
        }

        .team-name {
          font-size: 14px;
        }

        .match-data {
          width: 100%;
        }

        .match-city {
          font-weight: normal;
          margin: 0 10px;
          text-align: center;
        }
        .match-field {
          font-weight: bold;
          margin: 0 10px;
          text-align: center;
        }
        .match-date {
          text-align: center;
        }
        .match-time {
          text-align: center;
        }
    </style>
    `;
    entityIdArray.forEach((entityId) => {
      const curState = hass.states[entityId];
      const date = new Date(curState.attributes.date);
      const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear()).padStart(2, "0")}`;
      const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      const homeTeamClubParts = curState.attributes.home.name.split(" ");
      const homeTeamName = homeTeamClubParts.pop();
      const homeTeamClub = homeTeamClubParts.join(" ");
      const awayTeamClubParts = curState.attributes.away.name.split(" ");
      const awayTeamName = awayTeamClubParts.pop();
      const awayTeamClub = awayTeamClubParts.join(" ");
      const address = curState.attributes.location.facility.address;
      // straat huisnr \n postcode plaats

      const [line1, line2] = address.split("\n");

      const parts1 = line1.trim().split(" ");
      const huisnr = parts1.pop(); // last word
      const straat = parts1.join(" ");

      const parts2 = line2.trim().split(" ");
      const postcode = parts2.shift(); // first word
      const plaats = parts2.join(" ");

      this.content.innerHTML += `
        <div class="team-container">
          <div class="team">
            <img src="${curState.attributes.home.logo}" class="team-logo" alt="Home Team Logo">
            <div class="team-name">${homeTeamClub}</div>
            <div class="team-name">${homeTeamName}</div>
          </div>
          <div class="match-data">
            <div class="match-city">${plaats}</div>
            <div class="match-date">${formattedDate}</div>
            <div class="match-time">${formattedTime}</div>
            <div class="match-field">${curState.attributes.location.field.name}</div>
          </div>
          <div class="team">
            <img src="${curState.attributes.away.logo}" class="team-logo" alt="Away Team Logo">
            <div class="team-name">${awayTeamClub}</div>
            <div class="team-name">${awayTeamName}</div>
          </div>
        </div>
      `;
    });
  }

  // The user supplied configuration. Throw an exception and Home Assistant
  // will render an error card.
  setConfig(config) {
    if (
      !config.entities ||
      !Array.isArray(config.entities) ||
      config.entities.length === 0
    ) {
      throw new Error("You need to define an array of entities");
    }
    this.title = config.title ?? "Hockey wedstrijden";

    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define("hockeynl-card", HockeyNLCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "hockeynl-card",
  name: "HockeyNL Card",
  description:
    "Card to display field hockey matches of HockeyWeerelt (Dutch Hockey league)",
});
