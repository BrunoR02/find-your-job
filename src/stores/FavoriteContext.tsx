import React, { createContext, useCallback, useState } from "react";

type ContextType = {
  favorites: string[],
  addFavorite: (id:string)=>void,
  removeFavorite:(id:string)=>void,
}

const FavoriteContext = createContext<ContextType>({
  favorites: [],
  addFavorite: ()=>{},
  removeFavorite:()=>{},
})

export function FavoriteContextProvider({children}:{children:React.ReactNode}){
  const [favorites,setFavorites] = useState<string[]>([])

  const addFavorite = useCallback((id:string)=>{
    setFavorites(prevList=>[...prevList,id])
  },[])

  const removeFavorite = useCallback((id:string)=>{
    setFavorites(prevList=>prevList.filter(favId=>favId!==id))
  },[])

  const context = {
    favorites,
    addFavorite,
    removeFavorite,
  }

  return (
    <FavoriteContext.Provider value={context}>
    {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteContext
