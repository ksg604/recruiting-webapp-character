import styles from "./CharacterSheet.module.css";
import { ATTRIBUTE_LIST } from "../consts";

export default function CharacterSheet({character, characters, setCharacters}) {

  const handleIncrementAttribute = (attributeToIncrement) => {
    character.incrementAttribute(attributeToIncrement);
    setCharacters({...characters, [character.name]: character});
  }

  const handleDecrementAttribute = (attributeToDecrement) => {
    character.decrementAttribute(attributeToDecrement);
    setCharacters({...characters, [character.name]: character});
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
      </section>
    </div>
  )
}