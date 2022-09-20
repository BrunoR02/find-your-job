export default function capitalizeFirstLetters(value:string){
  let splitWords = value.split(" ")
      
  for(let i=0;i<splitWords.length;i++){
    splitWords[i] = splitWords[i].charAt(0).toUpperCase() + splitWords[i].slice(1)
  }

  return splitWords.join(" ")
}