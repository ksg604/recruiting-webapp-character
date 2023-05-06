import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";

export class Character {
  constructor(name) {
    this.name = name;
    this.attributes = {};
    this.skills = {};
    for (const attribute of ATTRIBUTE_LIST) {
      this.attributes[attribute] = {value: 10, modifier: 0};
    }
    this.skillPoints = 10;
    for (const skill of SKILL_LIST) {
      this.skills[skill.name] = {name: skill.name, value: 0, modifier: skill.attributeModifier}
    }
  }

  incrementAttribute(attributeName) {
    let newValue = this.attributes[attributeName].value += 1;
    let newModifier = Math.floor((newValue - 10) / 2);
    if (attributeName === "Intelligence") {
      this.skillPoints = 10 + (4 * newModifier);
    }
    this.attributes[attributeName] = {modifier: newModifier, value: newValue};
    Object.values(this.skills).forEach(skill =>{
      if (skill.modifier === attributeName && Math.floor(newModifier) === this.attributes[attributeName].modifier) {
        this.skills[skill.name].value = 0 + newModifier;
      }
    });
    //this.skills[skillName] = {...this.skills[skillName], value: this.skills[skillName].value + this.attributes[this.skills[skillName].modifier].modifier }
  }

  decrementAttribute(attributeName) {
    let newValue = this.attributes[attributeName].value -= 1;
    let newModifier = Math.floor((newValue - 10) / 2);
    if (attributeName === "Intelligence") {
      this.skillPoints = 10 + (4 * newModifier);
      if (this.skillPoints < 0) this.skillPoints = 0;
    }
    this.attributes[attributeName] = {modifier: newModifier, value: newValue};
    Object.values(this.skills).forEach(skill =>{
      if (skill.modifier === attributeName && Math.floor(newModifier) === this.attributes[attributeName].modifier) {
        this.skills[skill.name].value = 0 + newModifier;
      }
    });
  }

  incrementSkill(skillName) {
    if (this.skillPoints <= 0) return;
    let newValue = this.skills[skillName].value += 1;
    this.skills[skillName] = {...this.skills[skillName], value: newValue};
    this.skillPoints--;
  }

  decrementSkill(skillName) {
    let newValue = this.skills[skillName].value -= 1;
    this.skills[skillName] = {...this.skills[skillName], value: newValue};
    this.skillPoints++;
  }

  meetsClassRequirements(className) {
    return Object.keys(this.attributes).every(attribute => this.attributes[attribute].value >= CLASS_LIST[className][attribute]);
  }
};