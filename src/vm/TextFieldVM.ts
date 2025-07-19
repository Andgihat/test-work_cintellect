import { makeAutoObservable } from "mobx";

export class TextFieldVM {
  value: string = "";

  constructor(initialValue: string = "") {
    this.value = initialValue;
    makeAutoObservable(this);
  }

  setValue = (newValue: string) => {
    this.value = newValue;
  };

  clear = () => {
    this.value = "";
  };

  setHello = () => {
    this.value = "Hello world";
  };

  alertValue = () => {
    alert(this.value);
  };

  validateNumber = () => {
    const n = Number(this.value);
    if (Number.isFinite(n)) {
      alert(`Число корректное: ${n}`);
    } else {
      alert("Некорректное число");
    }
  };
}