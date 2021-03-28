export class ApiService {
  json: any;
  constructor() {
  }



  async getCharacters(page ?: number) {
    this.json = await fetch(`https://rickandmortyapi.com/api/character${page ? '/' + page : ''}`).then(res => res.json()).then(json => {
      return json;
    });
    return this.json;
  }


  async getSingleChar(identity: string, parameter: string) {


    this.json = await fetch(`https://rickandmortyapi.com/api/${parameter}/${identity}`).then(res => res.json()).then(json => {
      return json
    });
    console.log('navemadre', this.json);
    return this.json;
  }




  async getEpisodeName(urlList: any[]) {
    if(urlList){
  let gringo = await Promise.all(urlList
      .map((url) => {
       return fetch(url)
          .then(res => res.json())
          .then(charcharRes => {
            console.log(charcharRes.name)
            return charcharRes.name})
      }));
    console.log('grrngo',gringo)
    return gringo;}
  }

  async getResidentName(urlList: any[]) {
    if(urlList){
  let gringo = await Promise.all(urlList
      .map((url) => {
       return fetch(url)
          .then(res => res.json())
          .then(charcharRes => {
            console.log(charcharRes.name)
            return charcharRes.name})
      }));
    console.log('grrngo',gringo)
    return gringo;}
  }

  async getCharacterName(urlList: any[]) {
    if(urlList){
  let gringo = await Promise.all(urlList
      .map((url) => {
       return fetch(url)
          .then(res => res.json())
          .then(charcharRes => {
            console.log(charcharRes.name)
            return charcharRes.name})
      }));
    return gringo;}
  }



  async getMoreInfo(parameter, urllist){
console.log('here',urllist);
    switch (parameter) {
      case 'location': {
        return await this.getResidentName(urllist.residents);
      }
      case 'episode': {
        return await this.getCharacterName(urllist.characters);
      }
      case 'character': {
        return await this.getEpisodeName(urllist.episode);
      }
      default: {
        return ;
      }
    }

  }

}





export const apiService = new ApiService();
