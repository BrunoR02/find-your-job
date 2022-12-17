import { useRouter } from "next/router"
import { useContext} from "react"
import { ProfileType } from "../../helpers/typeDefs"
import AuthContext, { AuthContextType } from "../../src/stores/authContext"
import BioText from "./BioText"
import EditProfileButton from "./edit/EditProfileButton"
import styles from "./ProfileBottom.module.css"

export default function ProfileBottom({profile}:{profile:ProfileType}){
  const {displayInfo} = useContext(AuthContext) as AuthContextType
  const router = useRouter()

  return (
    <div className={styles.container}>
      <BioText text={profile.bio}/>
      {router.query.username===displayInfo.username && <EditProfileButton profile={profile}/>}
    </div>
  )
}