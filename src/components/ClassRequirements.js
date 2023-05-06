import styles from "./ClassRequirements.module.css";
import { CLASS_LIST } from "../consts";

export default function ClassRequirements({className}) {
  return(
    <div className={styles["ClassRequirements"]}>
      <h2>{className} minimum requirements</h2>
      <div className={styles["attributes"]}>
        {
          Object.keys(CLASS_LIST[className]).map(attribute => <p key={attribute}>{attribute}: {CLASS_LIST[className][attribute]}</p>)
        }
      </div>
    </div>
  )
}