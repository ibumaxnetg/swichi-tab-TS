class tabSwitchClass {
  tabTempElement: HTMLTemplateElement;
  editElement: HTMLElement;
  outputElement: HTMLElement;
  changeSwitchTab: NodeListOf<HTMLLIElement>;
  changeSwitchContent: NodeListOf<HTMLDialogElement>;

  constructor(tabClass: string) {
    this.tabTempElement = document.getElementById(
      "tab-template"
    )! as HTMLTemplateElement;
    const nodeElement = document.importNode(this.tabTempElement.content, true);
    this.editElement = nodeElement.firstElementChild as HTMLElement;

    this.outputElement = document.getElementById("app")! as HTMLDivElement;

    this.changeSwitchTab = this.editElement.querySelectorAll("li");
    this.changeSwitchContent = this.editElement.querySelectorAll(
      ".tab-content"
    );

    this.changeSwitchTab.forEach((tabSwitch, index) => {
      // tabSwitch.addEventListener("click", {indexNum: index, handleEvent: this.tabChange});
      tabSwitch.addEventListener("click", this.tabChange.bind(this));
    });

    // console.log(this.changeSwitchContent);
    this.attach();
  }

  tabChange(event: Event) {
    // console.log("tabSwitch", event.currentTarget);
    // console.log(this.changeSwitchContent);
    this.changeSwitchContent.forEach((elem, index) => {
      if (this.changeSwitchTab[index] === event.currentTarget) {
        elem.classList.add("active");
        this.changeSwitchTab[index].classList.add("active");
      } else {
        elem.classList.remove("active");
        this.changeSwitchTab[index].classList.remove("active");
      }
    });
  }

  attach() {
    this.outputElement.insertAdjacentElement("afterbegin", this.editElement);
  }
}

new tabSwitchClass("wrap-tab");
