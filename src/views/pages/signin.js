import App from './../../App'
import {html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`      
      <div class="page-content signin">
        <div class="signinup-box">
            <img class="signinup-logo" src="/images/logo-white.svg">
            <p>Welcome! This is Dezine Corner's website exclusively for booking tickets and seats to our workshops, events and group networks. 
              To access this content, please log in. </p>
        </div>

        <form class="input-validation-required-signin" @submit="${this.signInSubmitHandler}">  
          <p> <i>Login<i> </p>
          <div class="input-group">
            <sl-input class="login" name="email" type="email" placeholder="Email" required></sl-input>
          </div>

          <div class="input-group">
            <sl-input class="login" name="password" type="password" placeholder="Password" required toggle-password></sl-input>
          </div>
          <sl-button class="submit-btn" type="submit" style="width: 100%;" pill>Sign In</sl-button>
          <p>No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
        </form>
      </div>
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()