import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'


class FourOFourView{
  init(){
    console.log('FourOFourView.init')    
    document.title = '404 File not found'    
    this.render()
  }

  render(){
    const template = html`    
      <div class="calign">
        <div class="calign-el">
          <h1>Oh no!</h1>
          <p>Sorry, that page doesn't exist.</p>
          <sl-button class="submit-btn" variant="primary" size="large" @click=${() => gotoRoute('/')} pill>Home</sl-button>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new FourOFourView()