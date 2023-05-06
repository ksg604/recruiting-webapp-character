import { ATTRIBUTE_LIST } from "./consts";

export class Character {
  constructor(name) {
    this.name = name;
    this.attributes = {};
    for (const attribute of ATTRIBUTE_LIST) {
      this.attributes[attribute] = {value: 10, modifier: 0};
    }
  }

  incrementAttribute(attributeName) {
    let newValue = this.attributes[attributeName].value += 1;
    this.attributes[attributeName] = {...this.attributes[attributeName], value: newValue};
    console.log(this.attributes[attributeName]);
  }

  decrementAttribute(attributeName) {
    let newValue = this.attributes[attributeName].value -= 1;
    this.attributes[attributeName] = {...this.attributes[attributeName], value: newValue};
  }
};