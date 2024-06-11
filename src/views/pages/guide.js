import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from './../../UserAPI'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header class="welcome" title="Guide" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content guide calign">        
        <h3 class="brand-color">Welcome ${Auth.currentUser.firstName}!</h3>
        <img class="guide-img" src="/images/guide-img.jpg">
        <img class="guide-img" src="/images/guide-img-2.jpg">

        <p></p>
        <div class="guide-btn">
          <sl-button class="submit-btn" variant="default" @click=${() => gotoRoute('/')} pill>
            <sl-icon slot="suffix" name="arrow-right"></sl-icon> 
            See Events
          </sl-button>
        </div>

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()