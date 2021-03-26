import { Component, h, Prop } from '@stencil/core';
import { apiService } from '../../services/api-service';

// import { apiService } from '../../services/api-service';
@Component({
  tag: 'portal-bay',
})
export class PortalBay {

  @Prop() anarchy: boolean;
  dataResults: any;

  componentWillLoad() {
    console.log(this.anarchy ? 'Anarchy reign' : 'Evil Morty Kingdom');
    if (this.anarchy) {
      return apiService.getCharacters().then(data => {
        this.dataResults = data.results;
      }).catch(error => {
        console.error(error);
      });
    }

  }


  printTerminalData(param: any) {
    if (param) {
      return <div>
      </div>;
    }
  }

  createInfoCard() {
    return this.dataResults.map((res: Profile) => {
      let imageId = 'imageID-' + res.id;
      let charLink = '/character/' + res.id;

      return <article class="card-list-item">
        <div class="profile-card">
          <div class="profile-card-status">
            <div class="profile-card-status-light"
                 data-status={res.status === 'unknown' ? 'UNK' : res.status === 'Alive' ? 'ALV' : 'DED'}>
            </div>
            <div class="profile-card-status-tag">{res.status === 'unknown' ? 'UNK' : res.status.toUpperCase()}</div>
          </div>
          <div class="profile-card-image-container">
            <div class="profile-card-image-portal">

            </div>
            <a href={charLink}>
              <img class="profile-card-image" id={imageId} src={res.image}> </img>
            </a>
          </div>
          <div class="profile-card-terminal">
            <div class="profile-card-terminal-info">
              <a href={charLink}>
                <div class="profile-card-terminal-info single-name">{res.name}</div>
              </a>
              <div>
                <div class="profile-card-terminal-info single-voice">{res.species} - {res.gender}</div>
              </div>
              <div class="profile-card-terminal-location">

                <div class="profile-card-terminal-location">
                  <div class="profile-card-terminal-info single-voice"> Location:</div>
                  <div class="profile-card-terminal-info single-voice">{res.location.name}</div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </article>;
    });
  }


  render() {
    return (

      <section class="card-list-collector">
        <div class="card-list-container">
          {this.createInfoCard()}
        </div>
      </section>


    );

  }
}
