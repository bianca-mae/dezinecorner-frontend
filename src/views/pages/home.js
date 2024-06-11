import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content home">
        <!-- <h1 class="anim-in">Hey ${Auth.currentUser.firstName}</h1> -->

        <div class="home-text">
          <h1>New Workshop</h1>

          <p>Come join us for our monthly workshop! 
            <br>This month's guest is illustrator and graphic designer, <i> Natalie Alder</i>.
            <br>
            Join us to learn on how to make your illustrations stand out from other <i>illustrators</i>.
          </p>
          <!-- <p>Join us to learn on how to make your illustrations stand out from other <i>illustrators</i>.</p> -->
          <br>
          
          <sl-button class="home-btn" size="medium" pill @click=${() => gotoRoute('/events')}>View more events</sl-button>
        </div>

        <img src="/images/natalie-alder.jpg" @click=${() => gotoRoute('/events')}>


        <!-- <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute('/profile')}>View Profile</sl-button>
        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a> -->

      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()