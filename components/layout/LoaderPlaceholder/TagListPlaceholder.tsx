import styles from "../../jobs/TagList.module.css"
import LoaderPlaceholder from "./LoaderPlaceholder"

export default function TagListPlaceholder(){
  return (
    <ul className={styles.list}>
      {[1,2,3].map(item=>
          <LoaderPlaceholder key={item} extraStyles={{width:"14%",height: "35px",margin: "0 0 10px 10px",borderRadius: "15px"}}/>
        )}
    </ul>
  )
}