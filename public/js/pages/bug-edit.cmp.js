'use strict'

import { bugService } from '../services/bug-service.js'
import { eventBus } from '../services/eventBus-service.js'

import { userService } from "../services/user.service.js"

export default {
  template: `
    <section v-if="bug" class="bug-edit">
    <datalist id="description-list">
          <option value="Server side problem">
          <option value="communication problem">
          <option value="JavaScript code problem">
     </datalist>
        <h1>{{(bug._id) ? 'Edit Bug': 'Add Bug'}}</h1>
        <form @submit.prevent="saveBug">
            <label> 
                <span>Title: </span>
                <input type="text" list="description-list" v-model="bug.title" placeholder="Enter title...">
            </label>
            <label> 
                <span>Description: </span>
                <input type="text" list="description-list" v-model="bug.description" placeholder="Enter title...">
            </label>
            <label>
                <span>Severity: </span>
                <input type="number" v-model="bug.severity" placeholder="Enter severity..." min="0" max="3">
            </label>
            <div class="actions">
              <button type="submit"> {{(bug._id) ? 'Save': 'Add'}}</button>
              <button @click.prevent="closeEdit">Close</button>
            </div>
        </form>
    </section>
    `,
  data() {
    return {
      bug: null,
      user: userService.getLoggedInUser(),
    }
  },
  created() {
   
      const { bugId } = this.$route.params
    if (bugId) {
      bugService.getById(bugId).then((bug) => {
        console.log('bug', bug)
        this.bug = bug

        if (this.user._id !== bug.creator._id ){
          eventBus.emit('show-msg', { txt: 'not your bug', type: 'error' })
          this.closeEdit()

        }
      })
    
    } else this.bug = bugService.getEmptyBug()
  },
  methods: {
    saveBug() {
      if (!this.bug.title || !this.bug.severity) {
        eventBus.emit('show-msg', { txt: 'All fields must be filled out.', type: 'error' })

      }
      else {

        let bugToSave = this.bug
        bugToSave.creator = this.user
        console.log('bugToSave', bugToSave)

        bugService.save({ ...bugToSave }).then(() => {
          console.log('this.bug', this.bug)
          eventBus.emit('show-msg', { txt: 'Bug saved successfully', type: 'success' })
          this.$router.push('/bug')
        })
      }
    },
    closeEdit() {
      this.$router.push('/bug')
    },
  },
}
