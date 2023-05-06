import { ATTRIBUTE_LIST, CLASS_LIST } from "./consts";

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
    let newModifier = Math.floor((newValue - 10) / 2);
    this.attributes[attributeName] = {modifier: newModifier, value: newValue};
  }

  decrementAttribute(attributeName) {
    let newValue = this.attributes[attributeName].value -= 1;
    let newModifier = Math.floor((newValue - 10) / 2);
    this.attributes[attributeName] = {modifier: newModifier, value: newValue};
  }

  meetsClassRequirements(className) {
    return Object.keys(this.attributes).every(attribute => this.attributes[attribute].value >= CLASS_LIST[className][attribute]);
  }
};