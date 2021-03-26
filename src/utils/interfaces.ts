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
