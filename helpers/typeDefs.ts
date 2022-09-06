export type Job = {
  description: string,
  id: string,
  tags: {name:string}[],
  company: {name: string},
  locationNames: string,
  title: string,
}