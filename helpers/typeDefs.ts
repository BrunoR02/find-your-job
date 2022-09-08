export type JobType = {
  description: string,
  id: string,
  tags: {name:string}[],
  company: {name: string},
  locationNames: string,
  title: string,
}

export type FiltersType = {
  search: string,
}