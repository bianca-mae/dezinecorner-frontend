import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
    this.user = null
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()    
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async updateProfileSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const formData = new FormData(e.target)
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('profile updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }

  render(){
    const template = html`
      <va-app-header title="Edit Profile" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      <div class="page-content edit-profile">  
        <h1> <i> Update Details </i></h1>      
        ${(this.user == null) ? html`
          <sl-spinner></sl-spinner>
        `:html`
          <form class="edit-profile-form" @submit=${this.updateProfileSubmitHandler.bind(this)}>
            
            <div class="user-pd">
              <div class="input-group">
                <sl-input class="input-form" label="First Name" type="text" name="firstName" value="${this.user.firstName}" placeholder="First Name"></sl-input>
              </div>
              <div class="input-group">
                <sl-input class="input-form" label="Last Name" type="text" name="lastName" value="${this.user.lastName}" placeholder="Last Name"></sl-input>
              </div>
              <div class="input-group">
                <sl-input class="input-form" label="Email" type="text" name="email" value="${this.user.email}" placeholder="Email Address"></sl-input>
              </div>
            </div>     

            <div class="bio-pfp">
              <div class="input-group">
                <sl-textarea class="input-form-ta" label="Bio" name="bio" rows="4" placeholder="Bio" value="${this.user.bio}"></sl-textarea>
              </div>        
              <div class="input-group">
                <label>Avatar</label><br>          
                ${(this.user.avatar) ? html`
                  <sl-avatar image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar>
                  <input type="file" name="avatar" />
                `: html`
                  <input type="file" name="avatar" />
                `}
              </div>
            </div>
            <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>

            <div class="buttons-profile">
              <sl-button variant="primary" type="submit" class="submit-btn" pill>Update Profile</sl-button>
              <sl-button variant="primary" class="submit-btn" @click=${() => gotoRoute('/profile')} pill>Profile</sl-button>
            </div>
          </form>

        `}
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new EditProfileView()