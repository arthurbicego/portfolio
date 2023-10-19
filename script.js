class StickyNavigation {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = window.innerHeight * 0.07;

    const tabs = document.querySelectorAll(".navbar-content");
    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => this.onTabClick(event, tab));
    });

    window.addEventListener("scroll", () => {
      this.onScroll();
    });

    window.addEventListener("resize", () => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    const targetId = element.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const scrollTop = targetElement.offsetTop - this.tabContainerHeight + 1;
    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });
  }

  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkTabContainerPosition() {
    const tabContainer = document.querySelector(".navbar-container");
    const offset =
      tabContainer.offsetTop +
      tabContainer.offsetHeight -
      this.tabContainerHeight;

    if (this.currentId === ".section-home") {
      document
        .querySelector(".navbar-container")
        .classList.remove("navbar-container--top");
    } else {
      if (window.scrollY > offset) {
        document
          .querySelector(".navbar-container")
          .classList.add("navbar-container--top");
      } else {
        document
          .querySelector(".navbar-container")
          .classList.remove("navbar-container--top");
      }
    }
  }

  findCurrentTabSelector() {
    let newCurrentId = null;
    let newCurrentTab = null;

    const tabs = document.querySelectorAll(".navbar-content");
    tabs.forEach((tab) => {
      const id = tab.getAttribute("href");
      const targetElement = document.querySelector(id);
      const offsetTop = targetElement.offsetTop - this.tabContainerHeight;
      const offsetBottom =
        targetElement.offsetTop +
        targetElement.offsetHeight -
        this.tabContainerHeight;

      if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
        newCurrentId = id;
        newCurrentTab = tab;
      }
    });

    if (this.currentId !== newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;

    if (this.currentTab) {
      width = this.currentTab.offsetWidth;
      left = this.currentTab.offsetLeft;
    }

    document.querySelector(
      ".navbar-container-slider"
    ).style.width = `${width}px`;
    document.querySelector(".navbar-container-slider").style.left = `${left}px`;
  }
}

new StickyNavigation();
