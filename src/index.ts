class tabSwitchClass {
  tabTempElement: HTMLElement;
  editElement: HTMLElement;
  outputElement: HTMLElement;
  changeSwitchTab: NodeListOf<HTMLLIElement>;
  changeSwitchContent: NodeListOf<HTMLElement>;

  constructor(tabClass: string) {
    this.tabTempElement = document.querySelector(
      `.${tabClass}`
    )! as HTMLElement;
    // console.log(this.tabTempElement);
    const nodeElement = document.importNode(this.tabTempElement, true);
    this.editElement = nodeElement as HTMLElement;
    // console.log(this.editElement);

    this.outputElement = document.getElementById("app")! as HTMLDivElement;

    this.changeSwitchTab = this.editElement.querySelectorAll(".list-tab li");
    this.changeSwitchContent = this.editElement.querySelectorAll(
      ".tab-content"
    );

    this.changeSwitchTab.forEach((tab, index) => {
      // console.log(tab);
      tab.addEventListener("click", this.tabChange.bind(this));
    });

    // console.log(this.changeSwitchContent);
    this.attach();
  }

  tabChange(event: Event) {
    // console.log("tabSwitch", event.currentTarget);
    // console.log(this.changeSwitchContent);
    this.changeSwitchTab.forEach((elem, index) => {
      if (elem === event.currentTarget) {
        elem.classList.add("active");
        this.changeSwitchContent[index].classList.add("active");
      } else {
        elem.classList.remove("active");
        this.changeSwitchContent[index].classList.remove("active");
      }
    });
  }

  attach() {
    this.tabTempElement.innerHTML = "";
    this.outputElement.insertAdjacentElement("afterbegin", this.editElement);
    console.log(this.outputElement);
  }
}

new tabSwitchClass("wrap-tab");
