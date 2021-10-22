import { GetQueryObject, AreaCode } from "./types/Types";

export class tabSwitchClass {
  queryObj: GetQueryObject = {};

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
    this.getQuery();
    this.initTab();
    this.attach();
  }

  private getQuery() {
    const queryString: string[] = window.location.search
      .substring(1)
      .split("&");
    // console.log(queryString);

    if (queryString[0] !== "") {
      for (const qryStr of queryString) {
        const kv = qryStr.split("=");
        this.queryObj[kv[0]] = kv[1];
      }
      // console.log("getQuery", this.queryObj.areacode);
    }
    // アドレスバー書き換え
    // window.history.replaceState("", "", "./firetest.html");
  }

  private initTab() {
    const areaCode: number =
      this.queryObj !== undefined && this.queryObj.areacode !== undefined
        ? Number(`${AreaCode[this.queryObj.areacode]}`)
        : AreaCode.tokyo;
    this.changeSwitchTab.forEach((elem, index) => {
      // console.log(
      //   areaCode,
      //   `${AreaCode[this.queryObj.areacode]}`,
      //   this.queryObj.areacode
      // );
      if (index === areaCode) {
        elem.classList.add("active");
        this.changeSwitchContent[index].classList.add("active");
      } else {
        elem.classList.remove("active");
        this.changeSwitchContent[index].classList.remove("active");
      }
    });
  }

  private tabChange(event: Event) {
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

  private attach() {
    this.tabTempElement.innerHTML = "";
    this.outputElement.insertAdjacentElement("afterbegin", this.editElement);
    // console.log(this.outputElement);
  }
}

new tabSwitchClass("wrap-tab");
