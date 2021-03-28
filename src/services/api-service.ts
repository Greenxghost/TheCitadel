export class ApiService {
  json: any;
  constructor() {
  }



  async getCharacters(page ?: any) {
    if(!page)
    this.json = await fetch(`https://rickandmortyapi.com/api/character`).then(res => res.json()).then(json => {
      return json;
    });
    else
      this.json = await fetch(`${page}`).then(res => res.json()).then(json => {
        return json;
      });
    return this.json;
  }



  async getSingleChar(identity: string, parameter: string) {


    this.json = await fetch(`https://rickandmortyapi.com/api/${parameter}/${identity}`).then(res => res.json()).then(json => {
      return json
    });
    return this.json;
  }

  async getEpisodeName(urlList: any[]) {
    if(urlList){
  let response = await Promise.all(urlList
      .map((url) => {
       return fetch(url)
          .then(res => res.json())
          .then(charcharRes => {
            console.log(charcharRes.name)
            return charcharRes.name})
      }));
    return response;}
  }

  async getResidentName(urlList: any[]) {
    if(urlList){
  let response = await Promise.all(urlList
      .map((url) => {
       return fetch(url)
          .then(res => res.json())
          .then(charcharRes => {
            return charcharRes.name})
      }));
    return response;}
  }

  async getCharacterName(urlList: any[]) {
    if(urlList){
  let response = await Promise.all(urlList
      .map((url) => {
       return fetch(url)
          .then(res => res.json())
          .then(charcharRes => {
            return charcharRes.name})
      }));
    return response;}
  }

  async getMoreInfo(parameter, urllist){
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
