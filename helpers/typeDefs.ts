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

export type NewJobType = {
  id:string
  title:string
  description: string
  tags: {name:string}[]
  company: string
  location: string
  applyUrl:string
  postedDate: string
}

export type FiltersType = {
  datePosted: number,
  jobLevels:string[]
}

export type ProfileType ={
  name: string
  locationName: string
  jobTitle: string
  profilePicture: string
  bio: string
}