import styles from "./BioText.module.css"

export default function BioText(){
  return (
    <section className={styles.container}>
      <h5 className={styles.title}>Bio</h5>
      <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sunt consectetur, 
      possimus laborum consequuntur pariatur beatae dicta voluptatibus quisquam. Corrupti voluptate fuga 
      maxime iste consectetur atque accusamus quaerat. Provident, sequi.</p>
    </section>
  )
}