import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = new FormData(e.target)
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`      
      <div class="page-content signup "> 
        <div class="signinup-box">
            <img class="signinup-logo" src="/images/logo-white.svg">
            <p>Welcome! This is Dezine Corner's website exclusively for booking tickets and seats to our workshops, events and group networks. 
              To access this content, please log in. </p>
        </div>


          <form class="input-validation-required-signup" @submit="${this.signUpSubmitHandler}">
            <p> <i>Sign Up</i> </p>
            <div class="input-group">
              <sl-input class="signup" name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="signup" name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="signup" name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="signup" name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>
            <div class="input-group">
              <sl-select class="drop-select" name="accessLevel" placeholder="I am a ..."> 
                <sl-option class="drop-select" value="1">Customer</sl-option>
                <sl-option class="drop-select" value="2">Admin</sl-option>
              </sl-select>
            </div>          
            <sl-button variant="primary" type="submit" class="submit-btn" style="width: 100%;" pill>Sign Up</sl-button>
            <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
          </form>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()