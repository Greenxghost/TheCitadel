import { Component, h } from '@stencil/core';

@Component({
  tag: 'the-citadel',
})
export class TheCitadel {



  render() {
    return (
      <div>
        <header>
          <div></div>
        </header>

        <main>
          <madness-module enabled={true} >
          </madness-module>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0} >
              <stencil-route url="/" component="golden-plaza" exact={true} />
              <stencil-route url="/character/:id" component="data-card" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
