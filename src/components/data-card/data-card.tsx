import { Component, h, Prop, State, Watch } from '@stencil/core';
import { apiService } from '../../services/api-service';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'data-card',
})
export class DataCard {

  @Prop() match: MatchResults;

  anarchy: boolean = true;
  @State() dataResults: any;
  @State() moreinfo: any;
  characterName: any;
  listBlock: any;
  @State() sheet: any;


  @Watch('dataResults')
  watchHandler(dataResults) {
    this.dataResults = dataResults;
  }


  componentWillLoad() {
    if (this.anarchy) {
      apiService.getSingleChar(this.match.params.id, this.match.params.case)
        .then(data => {
          this.dataResults = data;
          console.log(this.dataResults);
          if (this.dataResults) {
            apiService.getMoreInfo(this.match.params.case, this.dataResults)
              .then(
                (data) => {
                  console.log('finito', data);
                  this.moreinfo = data;
                  console.log('this.moreinfo', this.moreinfo);
                },
              );
          }
        })
        .catch(error => {
          console.error(error);
        });


    }
  }

  createInfo() {
    console.log('case:', this.match.params.case);

    switch (this.match.params.case) {
      case 'location': {
        console.log('dataresult', this.dataResults);

        this.sheet = this.createInfoLoc(this.dataResults);
        break;

      }
      case 'episode': {
        console.log('dataresult', this.dataResults);

        this.sheet = this.createInfoEpi(this.dataResults);
        break;
      }
      case 'character': {
        console.log('dataresult', this.dataResults);

        this.sheet = this.createInfoCard(this.dataResults);
        break;
      }
      default: {
        return;
      }
    }


  }



  treatUrl(url) {
    let split = url.split('/');
    let destination = '/' + split[4] + '/' + split[5];
    return destination;
  }

  trackEpisodesFeatured(episodeList: any, episodeName: any) {
    let blockList = [];
    console.log('episodeList', episodeList);
    console.log('moar?', episodeName);

    episodeList.forEach((episode, index) => {
      let block = <a href={this.treatUrl(episode)}>
        <div>{episodeName[index]}</div>
      </a>;
      blockList.push(block);

    });
    return blockList;
  }
  createInfoCard(res) {
    // let charLink: string = '/'+this.match.params.case+'/' + this.match.params.id;

    return <article class="profile-sheet">
      <img src={res.image}> </img>
      <div class="character-sheet">
        <div class="liveInfo">
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Name:</div>
            <div class="profile-sheet-row-result">{res.name}</div>
          </div>
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Gender:</div>
            <div class="profile-sheet-row-result">{res.gender}</div>
          </div>
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Species:</div>
            <div class="profile-sheet-row-result">{res.species}</div>
          </div>
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Status:</div>
            <div class="profile-sheet-row-result">{res.status}</div>
          </div>

        </div>

        <div class="locationInfo">

          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Location:</div>
            <a class="profile-sheet-row-result" href={this.treatUrl(res.location.url)}>
              <div>{res.location.name}</div>
            </a>
          </div>
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Origin:</div>
            <a class="profile-sheet-row-result" href={this.treatUrl(res.origin.url)}>
              <div>{res.origin.name}</div>
            </a>
          </div>

        </div>


        <div class="chapterlist">
          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">{res.episode.length} sightings already:</div>
          </div>
          <div class="chapterlist-title scrollbox">
            {this.moreinfo ? this.trackEpisodesFeatured(res.episode, this.moreinfo) : ''}
          </div>
        </div>
      </div>
    </article>;

  }


  trackCharactersFeatured(characterList: any, characterName: any) {
    let blockList = [];
    console.log('episodeList', characterList);
    console.log('moar?', characterName);

    characterList.forEach((pg, index) => {
      let block = <a href={this.treatUrl(pg)}>
        <div>{characterName[index]}</div>
      </a>;
      blockList.push(block);

    });
    return blockList;
  }
  createInfoEpi(res) {

    // let charLink: string = '/'+this.match.params.case+'/' + this.match.params.id;

    console.log('block', res);


    return <article class="profile-sheet">
      <div class="episode-sheet">

        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Name:</div>
          <div class="profile-sheet-row-result">{res.name}</div>
        </div>
        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Episode:</div>
          <div class="profile-sheet-row-result">{res.episode}</div>
        </div>
        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Featured by {res.characters.length} characters:</div>
          <div class="scrollbox">

            {this.moreinfo ? this.trackCharactersFeatured(res.characters, this.moreinfo) : ''}
          </div>
        </div>


      </div>
    </article>;

  }


  trackResidentsHosted(residentList: any, residentName: any) {
    let blockList = [];
    console.log('episodeList', residentList);
    console.log('moar?', residentName);

    residentList.forEach((pg, index) => {
      let block = <a href={this.treatUrl(pg)}>
        <div>{residentName[index]}</div>
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
          <div class="profile-sheet-row-result">{res.name}</div>
        </div>
        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Type:</div>
          <div class="profile-sheet-row-result">{res.type}</div>
        </div>
        <div class="profile-sheet-row">
          <div class="profile-sheet-row-title">Hosted {res.residents.length} residents:</div>
          <div class="scrollbox">

            {this.moreinfo ? this.trackCharactersFeatured(res.residents, this.moreinfo) : ''}
          </div>
        </div>

      </div>
    </article>;

  }

  render() {
    console.log(this.sheet);
    if (this.dataResults)
      this.createInfo();
    return (
      <section class="data-profile">
        <div class="profile-sheet-container">
          {this.sheet ? this.sheet : ''}

        </div>
      </section>


    );

  }


}


