import { Component, h } from '@stencil/core';

@Component({
  tag: 'golden-plaza',
})
export class GoldenPlaza {

  render() {


    return (
  <div class="golden-plaza">
      <div class="hero-container">
        <div class="hero-container-cover">
          <portal-room>  </portal-room>
        </div>
      </div>
        <portal-bay anarchy={true}> </portal-bay>
  </div>

    );
  }
}
