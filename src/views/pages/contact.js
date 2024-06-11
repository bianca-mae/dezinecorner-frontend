import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class ContactView {
  init(){
    document.title = 'Contact'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Contact" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content contact">  
        <div class="contact-text">      
          <h1> <i>Contact</i> </h1>
          <p>For any further inquiries or questions, please contact us using the contact form below.</p>
        </div>
        
        <div class="cform">
          <form class="contact-form">

            <div class="m-user-details">
              <div class="input-group">
                <sl-input class="input-form" label="Name" type="text" name="name" placeholder="Name"></sl-input>
              </div>
              <div class="input-group">
                <sl-input class="input-form" label="Email" type="text" name="email" placeholder="Email"></sl-input>
              </div>
              <div class="input-group">
                <sl-input class="input-form" label="Subject" type="text" name="subject" placeholder="Subject"></sl-input>
              </div>
            </div>

            <div class="input-group-cform">
              <sl-textarea class="input-form-ta" label="Message" name="message" rows="4" placeholder="Message"></sl-textarea>
            </div>
            <sl-button class="submit-btn" size="medium" pill>Send</sl-button>
          </form>

        </div>


        
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ContactView()