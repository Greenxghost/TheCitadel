import { Component, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'portal-room',
})
export class PortalRoom {

  @Event({
    eventName: 'navigate',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) navigateNow: EventEmitter;

  navigateSearch(navigate) {
    this.navigateNow.emit(navigate);
  }


  render() {
    return (
      <div class="hero">
        <div class="navigation-bar">
          <div class="navigation-bar-arrow-left" onClick={() => this.navigateSearch('prev')}> </div>
          <div class="navigation-bar-search">
            <input type='text'> </input>
          </div>
          <div class="navigation-bar-arrow-right" onClick={() => this.navigateSearch('next')}> </div>
        </div>
      </div>
    );
  }
}
