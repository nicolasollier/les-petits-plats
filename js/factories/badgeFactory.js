export class BadgeFactory {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }

  removeBadge() {
    const badgeList = document.querySelector(".badge-list");
    const badge = document.querySelector(`.${this.type}-badge`);
    badgeList.removeChild(badge);
  }

  renderBadge() {
    const badgeList = document.querySelector(".badge-list");
    const badge = document.createElement("div");
    const badgeName = document.createElement("span");
    const badgeClose = document.createElement("img");

    badge.classList.add("item__badge");

    badge.classList.add(`${this.type}-badge`);
    badgeName.classList.add("badge__name");
    badgeClose.classList.add("badge__close");

    badgeName.textContent = this.data;
    badgeClose.src = "/images/assets/badge-close__icn.svg";
    badgeClose.alt = "Close badge";
    badgeClose.classList.add("ms-2");

    badgeClose.addEventListener("click", (e) => {
      e.preventDefault();
      const event = new CustomEvent("updateActiveFilters", {
        detail: {
          action: "remove",
          type: this.type,
          data: this.data,
        },
      });
      document.dispatchEvent(event);
      this.removeBadge();
    });

    badge.appendChild(badgeName);
    badge.appendChild(badgeClose);
    badgeList.appendChild(badge);
  }
}