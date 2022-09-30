export type JobType = {
  id: string,
  title: string,
  description: string,
  tags: {name:string}[],
  company: {name: string},
  cities: {name:string}[],
  countries: {isoCode:string}[],
  remotes: {type:string}[],
  applyUrl:string
}

export type FiltersType = {
  search: string,
  workplaces: string[],
}

export type ProfileType ={
  name: string
  locationName: string
  jobTitle: string
  profilePicture: string
  bio: string
}