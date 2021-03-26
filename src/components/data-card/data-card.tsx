import { Component, h, Prop } from '@stencil/core';
import { apiService } from '../../services/api-service';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'data-card',
})
export class DataCard {

  @Prop() match: MatchResults;

  anarchy: boolean = true;
  dataResults: Profile;

  componentWillLoad() {
    if (this.anarchy) {
      return apiService.getSingleChar(this.match.params.id).then(data => {
        this.dataResults = data;
        console.log('data', data);
      }).catch(error => {
        console.error(error);
      });
    }

  }

  trackEpisodesFeatured(episodeList: any) {
    console.log(episodeList.forEach((episode) => {
      console.log('aaaaaaaaaaaa', episode);
      return <a href={episode}>
        <div>{episode.substring(episode.lastIndexOf('/') + 1)}</div>
      </a>;
    }));

  }


  createInfoCard(res) {
    return <article class="profile-sheet">

      <img src={res.image}> </img>
      <div class="">
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
            <a href={res.location.url}>
              <div>{res.location.name}</div>
            </a>
          </div>

          <div class="profile-sheet-row">
            <div class="profile-sheet-row-title">Origin:</div>
            <a href={res.origin.url}>
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


  render() {
    return (

      <section class="data-profile">
        <div class="profile-sheet-container">
          {this.createInfoCard(this.dataResults)}
        </div>
      </section>


    );

  }
}
