interface Profile {
  created?: any,
  episode?: any[],
  gender?: string,
  id?: number,
  image: string,
  location: Locations,
  name: string,
  origin: Origin,
  species: string,
  status?: string,
  type?: string,
  url?: string
}


interface Origin {
  name?: string,
  url?: string
}

interface Locations
{
  name?: string,
  url?: string
}

interface Location {
  dimension?: string,
  id?: string,
  name?: string,
  residents?: any[],
  type?: string
}

interface Episode {
  id?: string,
  episode?: string,
  name?: string,
  characters?: any[]
}
