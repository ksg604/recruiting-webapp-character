import styles from "./CharacterSheet.module.css";
import { ATTRIBUTE_LIST, CLASS_LIST } from "../consts";
import { useState } from "react";
import ClassRequirements from "./ClassRequirements";

export default function CharacterSheet({character, characters, setCharacters}) {

  const [classRequirementsOpen, setClassRequirementsOpen] = useState("");

  const handleIncrementAttribute = (attributeToIncrement) => {
    character.incrementAttribute(attributeToIncrement);
    setCharacters({...characters, [character.name]: character});
  }

  const handleDecrementAttribute = (attributeToDecrement) => {
    character.decrementAttribute(attributeToDecrement);
    setCharacters({...characters, [character.name]: character});
  }

  const handleOpenClassRequirements = (className) => {
    if (classRequirementsOpen === className) {
      setClassRequirementsOpen("");
      return;
    }
    setClassRequirementsOpen(className);
  }

  return(
    <div className={styles["CharacterSheet"]}>
      <section className={styles["stats"]}>
        <div className={styles["stats-box"]}>
          {ATTRIBUTE_LIST.map(attribute => 
            <div key={attribute} className={styles["attribute-container"]}>
              <span>{attribute}: {character.attributes[attribute].value} (Modifier: {character.attributes[attribute].modifier}) </span>
              <button onClick={() => handleIncrementAttribute(attribute)}>+</button>
              <button onClick={() => handleDecrementAttribute(attribute)}>-</button>
            </div>
          )}
        </div>
        <div className={styles["stats-box"]}>
          {Object.keys(CLASS_LIST).map(characterClass => 
            <span  
              style={character.meetsClassRequirements(characterClass) ? {color: "red"} : {color: "inherit"}} 
              key={characterClass}
              onClick={() => handleOpenClassRequirements(characterClass)}>
                {characterClass}
            </span>
          )}
        </div>
        {
          classRequirementsOpen !== "" ? <ClassRequirements className={classRequirementsOpen}/> : ""
        }
      </section>
    </div>
  )
}