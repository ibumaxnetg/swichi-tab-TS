class tabSwitchClass {
  private static instans: tabSwitchClass;

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

    this.changeSwitchTab = this.editElement.querySelectorAll(".list-tab li");
    this.changeSwitchContent = this.editElement.querySelectorAll(
      ".tab-content"
    );

    this.changeSwitchTab.forEach((tabSwitch, index) => {
      // tabSwitch.addEventListener("click", {indexNum: index, handleEvent: this.tabChange});
      tabSwitch.addEventListener("click", this.tabChange);
    });

    // console.log(this.changeSwitchContent);
    this.attach();
  }

  static getInstance(tabClass: string) {
    if (!this.instans) {
      this.instans = new tabSwitchClass(tabClass);
    }
    return this.instans;
  }

  tabChange(event: Event) {
    tabSwitctCl.changeSwitchTab.forEach((elem, index) => {
      elem.classList.remove("active");
      tabSwitctCl.changeSwitchContent[index].classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    const arrayTabs = Array.prototype.slice.call(tabSwitctCl.changeSwitchTab);
    const index = arrayTabs.indexOf(this);
    tabSwitctCl.changeSwitchContent[index].classList.add("active");
  }

  attach() {
    this.outputElement.insertAdjacentElement("afterbegin", this.editElement);
  }
}

const tabSwitctCl = tabSwitchClass.getInstance(".wrap-tab");
