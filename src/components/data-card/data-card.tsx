import { Component, h, Prop } from '@stencil/core';
import { apiService } from '../../services/api-service';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'data-card',
})
export class DataCard {

  @Prop() match: MatchResults;

  anarchy: boolean = true;
  dataResults: any;
  characterName: any;
  listBlock: any;

  componentWillLoad() {
    if (this.anarchy) {
      return apiService.getSingleChar(this.match.params.id, this.match.params.case).then(data => {
        this.dataResults = data;
        console.log('data', data);
      }).catch(error => {
        console.error(error);
      });
    }

  }

  trackEpisodesFeatured(episodeList: any) {
    let blockList = [];
    episodeList.forEach((episode) => {
      let block = <a href={this.treatUrl(episode)}>
        <div>{episode.substring(episode.lastIndexOf('/') + 1)}</div>
      </a>;
      blockList.push(block);

    });
    return blockList;
  }

  treatUrl(url) {
    let split = url.split('/');
    let destination = '/' + split[4] + '/' + split[5];
    return destination;
  }


  createInfo() {

    switch (this.match.params.case) {
      case 'location': {
        return this.createInfoLoc(this.dataResults);
      }
      case 'episode': {
        return this.createInfoEpi(this.dataResults);
      }
      case 'character': {
        return this.createInfoCard(this.dataResults);
      }
      default: {
        return this.createInfoCard(this.dataResults);
      }
    }


  }

  createInfoCard(res) {

    // let charLink: string = '/'+this.match.params.case+'/' + this.match.params.id;


    return <article class="profile-sheet">

      <img src={res.image}> </img>
      <div class="character-sheet">
        <div class="liveInfo">
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Name:</div>
            <div>{res.name}</div>
          </div>
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Gender:</div>
            <div>{res.gender}</div>
          </div>
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Species:</div>
            <div>{res.species}</div>
          </div>
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Status:</div>
            <div>{res.status}</div>
          </div>

        </div>

        <div class="locationInfo">

          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Location:</div>
            <a href={this.treatUrl(res.location.url)}>
              <div>{res.location.name}</div>
            </a>
          </div>
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Origin:</div>
            <a href={this.treatUrl(res.origin.url)}>
              <div>{res.origin.name}</div>
            </a>
          </div>

        </div>


        <div class="chapterlist">
          <div class="chapterlist-title">
            {res.episode.length} sightings already:
          </div>
          {this.trackEpisodesFeatured(res.episode)}
        </div>
      </div>
    </article>;

  }

  connectCharacter(character: string) {
    return apiService.getCharacterName(character);
  }


  trackCharacter(list) {
    // let blockList: any[];


    list.map((character) => {
      console.log(character);
      this.connectCharacter(character)
        .then((data) => {
          this.listBlock.push(data.name);
        });

    });

  }

  createInfoEpi(res) {

    // let charLink: string = '/'+this.match.params.case+'/' + this.match.params.id;

    this.trackCharacter(res.characters);
    console.log('block',this.listBlock);


    return <article class="profile-sheet">
      <div class="episode-sheet">

        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Name:</div>
          <div>{res.name}</div>
        </div>
        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Episode:</div>
          <div>{res.episode}</div>
        </div>
        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Characters:</div>
          <div>
            {this.listBlock}
          </div>
        </div>


      </div>
    </article>;

  }


  connectResident(resident: string) {
    let residentInfo: string;
    return apiService.getResidentName(resident).then(data => {
      residentInfo = data.name;
      return residentInfo;
    }).catch(error => {
      console.error(error);
    });
  }

  trackResident(list) {
    let blockList = [];
    list.forEach((resident) => {
      let block = <a href={this.treatUrl(resident)}>
        <div>{this.connectResident(resident)}</div>
      </a>;
      blockList.push(block);

    });
    return blockList;
  }

  createInfoLoc(res) {

    // let charLink: string = '/'+this.match.params.case+'/' + this.match.params.id;

    return <article class="profile-sheet">

      <img src={res.image}> </img>

      <div class="location-sheet">

        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Name:</div>
          <div>{res.name}</div>
        </div>
        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Type:</div>
          <div>{res.type}</div>
        </div>
        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Residents:</div>
          <div class="hioh">
            {this.trackResident(res.residents)}
          </div>
        </div>

      </div>
    </article>;

  }

  render() {
    return (

      <section class="data-profile">
        <div class="profile-sheet-container">
          {this.createInfo()}
        </div>
      </section>


    );

  }
}
