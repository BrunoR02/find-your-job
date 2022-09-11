import LoaderPlaceholder from "../layout/LoaderPlaceholder/LoaderPlaceholder"
import styles from "./TagList.module.css"

type PropsType = {
  list: {name: string}[],
  loading: boolean,
}

export default function TagList({list,loading}: PropsType){
  return (
    <ul className={styles.list}>
      {loading && [1,2,3].map(item=>
          <LoaderPlaceholder key={item} extraStyles={{width:"14%",height: "35px",margin: "0 0 10px 10px",borderRadius: "15px"}}/>
        )}
      {!loading && list.map(({name}:{name:string})=>{
        return <li key={name} className={styles.item}>{name}</li>
      })}
    </ul>
  )
}