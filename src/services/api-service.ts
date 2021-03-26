export class ApiService {


  constructor() {
  }

  async getCharacters(page ?: number) {
  let json = await fetch( `https://rickandmortyapi.com/api/character${page ? '/'+page : ''}` ).then(res => res.json()).then(json => {return json})
    return json;
  }


  async getSingleChar(identity: string, parameter: string){
    let json = await fetch( `https://rickandmortyapi.com/api/${parameter}/${identity}` ).then(res => res.json()).then(json => {return json})
    return json;
  }


  async getMoreInfo(identity: string){
    let json = await fetch( `https://rickandmortyapi.com/api/character/${identity}` ).then(res => res.json()).then(json => {return json})
    return json;
  }

  async getCharacterName(url: string){
    let json = await fetch( `${url}` ).then(res => res.json()).then(json => {return json})
    return json;
  }

  async getResidentName(url: string){
    let json = await fetch( `${url}` ).then(res => res.json()).then(json => {return json})
    return json;
  }

}






export const apiService = new ApiService();
