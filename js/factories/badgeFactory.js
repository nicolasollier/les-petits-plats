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
    const badgeClose = document.createElement("span");

    badge.classList.add("item__badge");
    
    //if badge not first child of badge-list should have 15px margin-left
    if (badgeList.childElementCount > 0) {
      badge.style.marginLeft = "15px";
    }

    badge.classList.add(`${this.type}-badge`);
    badgeName.classList.add("badge__name");
    badgeClose.classList.add("badge__close");

    badgeName.textContent = this.data;
    badgeClose.textContent = "x";

    badgeClose.addEventListener("click", (e) => {
      e.preventDefault();
      this.removeBadge();
    });

    badge.appendChild(badgeName);
    badge.appendChild(badgeClose);
    badgeList.appendChild(badge);
  }
}