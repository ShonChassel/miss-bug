'use strict'
import { bugService } from '../services/bug-service.js'
import { userService } from "../services/user.service.js"
import { eventBus } from "../services/eventBus-service.js"

import bugList from '../cmps/bug-list.cmp.js'
import bugFilter from '../cmps/bug-filter.cmp.js'

export default {
  template: `
    <section class="bug-app">
        <div class="subheader">
          <bug-filter @setFilterBy="setFilterBy"></bug-filter> ||
          <router-link to="/bug/edit">Add New Bug</router-link> 
        </div>
        <bug-list v-if="bugs" :bugs="bugs" @removeBug="removeBug"></bug-list>
        <button @click="setPage(-1)">Prev</button>
        <span>{{filterBy.page}}</span>
        <button @click="setPage(1)">Next</button>
        <h2>Total Pages {{totalPages}}</h2>
    </section>
    `,
  data() {
    return {
      user: userService.getLoggedInUser(),
      bugs: null,
      filterBy: {
        title: '',
        page: 0,
      },
      totalPages: 0,
      userDetails: false,
    }
  },
  created() {
    eventBus.on('userDetails',this.userDetails)
    this.loadBugs()
  },
  methods: {
    userDetails(val) {
      console.log('val',val);
    },
    loadBugs() {
      bugService.query(this.filterBy).then(({ totalPages, filteredBugs }) => {
        ; (this.totalPages = totalPages), (this.bugs = filteredBugs)
      })
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
      this.loadBugs()
    },
    removeBug(bugId) {
      let bug = bugService.getById(bugId).then((bug) => {
        console.log('bug', bug)
        console.log('this.user', this.user)

        if (this.user._id !== bug.creator._id) {
          // eventBus.emit('show-msg', { txt: 'not your bug', type: 'error' })
          return
        }
      })



      bugService.remove(bugId).then(() => this.loadBugs())
    },
    setPage(dir) {
      this.filterBy.page += dir
      if (this.filterBy.page > this.totalPages - 1) this.filterBy.page = 0
      if (this.filterBy.page < 0) this.filterBy.page = this.totalPages - 1
      this.loadBugs()
    }
  },
  computed: {
    bugsToDisplay() {
      if (!this.filterBy?.title) return this.bugs
      return this.bugs.filter((bug) => bug.title.includes(this.filterBy.title))
    },
  },
  components: {
    bugList,
    bugFilter,
  },
}
