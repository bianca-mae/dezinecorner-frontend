import App from './../../App'
import { html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import EventAPI from './../../EventAPI'
import Toast from './../../Toast'

class EventsView {
  async init(){
    document.title = 'Events' 
    this.events = null   
    this.render()    
    Utils.pageIntroAnim()
    await this.getEvents()
    // this.filterEvents('price', '20-30')
  }

  async filterEvents(field, match){
    // validate
    if(!field || !match) return

    // get fresh copy of events
    this.events = await EventAPI.getEvents()

    let filteredEvents

    // eventType
    if(field == 'eventType'){
      filteredEvents = this.events.filter(event => event.eventType == match)
    }

    // price
    if(field == 'price'){
      // get priceRangeStart
      const priceRangeStart = match.split('-')[0]
      const priceRangeEnd = match.split('-')[1]
      // console.log(priceRangeStart, priceRangeEnd)
      filteredEvents = this.events.filter(event => event.price >= priceRangeStart && event.price <= priceRangeEnd)
      
    }
    // render
    this.events = filteredEvents
    this.render()
  }

  clearFilterBtns(){
    const filterBtns = document.querySelectorAll('.filter-btn')
    filterBtns.forEach(btn => btn.removeAttribute("variant"))
  }

  handleFilterBtn(e){
    // console.log(e.target)

    // clear all filter buttons
    this.clearFilterBtns()

    // set button active ( type = primary )
    e.target.setAttribute("variant", "primary")

    // extract the field and match from the button
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")
    // console.log("field = ", field)
    // console.log("match = ", match)

    // filter events
    this.filterEvents(field, match)
  }

  clearFilters(){
    this.getEvents()
    this.clearFilterBtns()
  }

  async getEvents(){
    try{
      this.events = await EventAPI.getEvents()
      console.log(this.events)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <style>
        .filter-menu {
          display: flex;
          flex-direction: column;
        }

        .filter-menu > div {
          margin-right: 2em;
        }

      </style>

      <va-app-header title="Events" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="events-content">  

        <div class="filter-menu">
          <h1>
            <i>Events<i>
          </h1>
          <div>
            <!-- <strong>Event Type</strong> -->
              <sl-button class="filter-btn" size="medium" data-field="eventType" data-match="workshop" @click=${this.handleFilterBtn.bind(this)}>Workshop</sl-button>
              <sl-button class="filter-btn" size="medium" data-field="eventType" data-match="guest" @click=${this.handleFilterBtn.bind(this)}>Guest</sl-button>
              <sl-button class="filter-btn" size="medium" data-field="eventType" data-match="networking" @click=${this.handleFilterBtn.bind(this)}>Networking</sl-button>
          </div>
          <!-- <div>
            <strong>Price</strong>
              <sl-button class="filter-btn" size="small" data-field="price" data-match="20-30" @click=${this.handleFilterBtn.bind(this)}>$20-$30</sl-button>
              <sl-button class="filter-btn" size="small" data-field="price" data-match="30-40" @click=${this.handleFilterBtn.bind(this)}>$30-$40</sl-button>
              <sl-button class="filter-btn" size="small" data-field="price" data-match="40-60" @click=${this.handleFilterBtn.bind(this)}>$40-$50</sl-button>
          </div> -->
          <div class="clear-btnc">
            <sl-button variant="text" class="clear-btn"size="small" @click=${this.clearFilters.bind(this)}>Clear Filters</sl-button>
          </div>
        </div> 

        <div class="events-grid">
        ${this.events == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.events.map(event => html`
            <va-event class="event-card" 
              id="${event._id}"
              eventName="${event.eventName}"
              eventType="${event.eventType}"
              price="${event.price}"
              host="${event.host}"
              date="${event.date}"
              location="${event.location}"
              description="${event.description}"
              image="${event.image}"
              user="${JSON.stringify(event.user)}"
            >
            </va-event>
          `)}
        `}
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new EventsView()