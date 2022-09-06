import React, { createContext, useState } from "react";

type ContextType = {
  favorites: string[],
  addFavorite: (id:string)=>void,
  removeFavorite:(id:string)=>void,
}

const FavoriteContext = createContext<ContextType | null>(null)

export function FavoriteContextProvider({children}:{children:React.ReactNode}){
  const [favorites,setFavorites] = useState<string[]>([])

  const context = {
    favorites,
    addFavorite(id:string){setFavorites(prevList=>[...prevList,id])},
    removeFavorite(id:string){setFavorites(prevList=>prevList.filter(favId=>favId!==id))}
  }

  return (
    <FavoriteContext.Provider value={context}>
    {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteContext
