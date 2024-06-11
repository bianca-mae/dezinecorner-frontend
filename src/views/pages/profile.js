import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="profile-content">
        
        <h1>My Account</h1>
        <div class="page-content-profile"> 
          <div class="pfp">     
            ${Auth.currentUser && Auth.currentUser.avatar ? html`
              <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
            `:html`
            <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
            `}
          </div>
          <div class="user-details">
            <p>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</p>
            <p>${Auth.currentUser.email}</p>
            <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
            ${Auth.currentUser.bio ? html`
            <br>
            <p> <i> Bio </i> </p>
            <p>${Auth.currentUser.bio}</p>
          ` : html ``}
          </div>
          
          <div class="edit-btnc">
            <sl-button class="edit-btn" @click=${()=> gotoRoute('/editProfile')} pill>Edit Profile</sl-button>
          </div>
        </div>
      </div>      
      `
    render(template, App.rootEl)
  }
}


export default new ProfileView()