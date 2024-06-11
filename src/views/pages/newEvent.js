import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import EventAPI from './../../EventAPI'
import Toast from './../../Toast'

class newEventView {
  init(){
    document.title = 'New Event'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newEventSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    const formData = new FormData(e.target)

    // console.log(formData)

    try{
      await EventAPI.newEvent(formData)
      Toast.show('Event added!')
      submitBtn.removeAttribute('loading')
      //reset form
      // reset text + textarea inputs
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)
      //reset file input
      const fileInput = document.querySelector('input[type=file]')
      if(fileInput) fileInput.value = null

    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
  }

  render(){
    const template = html`
      <va-app-header title="New Event" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content add-event">        
        <div class="heading">
          <sl-icon class="back-arrow" name="arrow-left" @click=${() => gotoRoute('/')}></sl-icon> 
          <h1><i>Create Event<i></h1>
        </div>

        <div class="addevent-form">
          <form class="page-form" @submit=${this.newEventSubmitHandler}>
            <input type="hidden" name="user" value="${Auth.currentUser._id}" />

            <div class="event-details">
              <div class="input-group" style="margin-bottom: 2em;">
                <label>Image</label><br>
                <input type="file" name="image" />              
              </div>
              <div class="input-group">
                <sl-input class="input-form" name="eventName" type="text" placeholder="Event Name" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input class="input-form" name="eventType" type="text" placeholder="Event Type" required></sl-input>
              </div>
              <div class="input-group">              
                <sl-input  class="input-form" name="price" type="text" placeholder="Price" required>
                  <span slot="prefix">$</span>
                </sl-input>
              </div>
              <div class="input-group">
                <sl-input class="input-form" name="host" type="text" placeholder="Host" required></sl-input>
              </div>
              <div class="input-group">
                <sl-textarea class="input-form-ta" name="description" rows="3" placeholder="Description"></sl-textarea>
              </div>
            </div>

            <div class="event-details-two">
              <div class="input-group">
                <sl-input class="input-form" name="location" rows="3" placeholder="Location"></sl-input>
              </div>
              <div class="input-group">
                <sl-input class="input-form" name="time" type="time" placeholder="Time" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input class="input-form-date" name="date" type="date" placeholder="Date" required></sl-input>
              </div>
            </div>
            <sl-button variant="primary" type="submit" class="submit-btn" pill>Create Event</sl-button>
          </form>
        </div>

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newEventView()