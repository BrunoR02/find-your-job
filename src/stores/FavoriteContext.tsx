import React, { createContext, useCallback, useEffect, useState } from "react";
import userClient from "../../config/ApolloClients/UsersClient";
import getDisplayInfo from "../../helpers/getDisplayInfo";
import { UPDATE_SAVED_JOBS } from "../queries/users";

export type FavoriteContextType = {
  favorites: string[]
  isLoading: boolean
  addFavorite: (id:string,token: string)=>void
  removeFavorite:(id:string,token:string)=>void
  retrieveFavorites:(token:string)=>void
}

const FavoriteContext = createContext<FavoriteContextType | null>(null)

export function FavoriteContextProvider({children}:{children:React.ReactNode}){
  const [favorites,setFavorites] = useState<string[]>([])
  const [loading,setLoading] = useState(false)
  const [currentToken,setCurrentToken] = useState<string | null>()
  const [listWasUpdated,setListWasUpdated] = useState(false)

  const updateSavedJobs = useCallback(async ()=>{
    setLoading(true)

    await userClient.mutate({mutation: UPDATE_SAVED_JOBS,variables:{input:{token:currentToken,savedJobs:favorites}}})
  
    setLoading(false)
  },[favorites,currentToken])

  const addFavorite = useCallback((id:string)=>{
    setFavorites(prevList=>[...prevList,id])
    setListWasUpdated(true)
  },[])

  const removeFavorite = useCallback((id:string)=>{
    setFavorites(prevList=>prevList.filter(favId=>favId!==id))
    setListWasUpdated(true)
  },[])

  async function retrieveFavorites(token:string){
    setCurrentToken(token)

    const data = await getDisplayInfo(token)

    setFavorites(data.savedJobs)
  }

  //Get token from localStorage
  useEffect(()=>{
    setCurrentToken(localStorage.getItem("token"))
  },[])

  useEffect(()=>{
    if(listWasUpdated){
      async function updateList(){
        await updateSavedJobs()
        setListWasUpdated(false)
      }
      updateList()
    }
  },[listWasUpdated,updateSavedJobs])

  useEffect(()=>{
    if(currentToken){
      async function updateList(){
        await retrieveFavorites(currentToken as string)
      }
      updateList()
    }
  },[currentToken])

  const context:FavoriteContextType = {
    favorites,
    isLoading: loading,
    addFavorite,
    removeFavorite,
    retrieveFavorites,
  }

  return (
    <FavoriteContext.Provider value={context}>
    {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteContext
