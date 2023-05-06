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
    this.attributePoints = 10;
    for (const skill of SKILL_LIST) {
      this.skills[skill.name] = {name: skill.name, value: 0, modifier: skill.attributeModifier}
    }
  }

  incrementAttribute(attributeName) {
    if (this.attributePoints <= 0) {
      window.alert("You have no attribute points left");
      return;
    }
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
    this.attributePoints--;
  }

  decrementAttribute(attributeName) {
    if (this.attributePoints >= 70) {
      window.alert("You cannot have more than 70 attribute points");
      return;
    }
    if (this.attributes[attributeName].value <= 0) {
      window.alert("Attribute points cannot be lower than 0");
      return;
    }
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
    this.attributePoints++;
  }

  incrementSkill(skillName) {
    if (this.skillPoints <= 0) {
      window.alert("You have no more skill points to spend!  Reduce your skills or increase your intelligence for more skill points.");
      return;
    }
    let newValue = this.skills[skillName].value += 1;
    this.skills[skillName] = {...this.skills[skillName], value: newValue};
    this.skillPoints--;
  }

  decrementSkill(skillName) {
    if (this.skills[skillName].value <= 0) {
      window.alert("You cannot spend skill points on skills less than 0");
      return;
    }
    let newValue = this.skills[skillName].value -= 1;
    this.skills[skillName] = {...this.skills[skillName], value: newValue};
    this.skillPoints++;
  }

  meetsClassRequirements(className) {
    return Object.keys(this.attributes).every(attribute => this.attributes[attribute].value >= CLASS_LIST[className][attribute]);
  }

  setSkills(skills) {
    this.skills = skills;
  }

  setAttributes(attributes) {
    this.attributes = attributes;
  }

  setSkillPoints(skillPoints) {
    this.skillPoints = skillPoints;
  }
};