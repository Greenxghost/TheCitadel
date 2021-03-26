import { Component, h } from '@stencil/core';

@Component({
  tag: 'portal-room',
})
export class PortalRoom {


  render() {
    return (
      <div class="hero">
        <div class="navigation-bar">
          <div class="navigation-bar-arrow-left"> 1--</div>
          <div class="navigation-bar-search">
            <input type='text'> </input>
          </div>
          <div class="navigation-bar-arrow-right"> --2</div>
        </div>
      </div>
    );
  }
}
