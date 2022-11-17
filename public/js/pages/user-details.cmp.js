import bugList from '../cmps/bug-list.cmp.js'

import { userService } from "../services/user.service.js"
import { bugService } from '../services/bug-service.js'


export default {
  template: `
      <section class="user-details">
          <h1>hey user</h1>
          <bug-list v-if="bugs" :bugs="bugs" @removeBug="removeBug"></bug-list>
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

    }
  },
  created() {
    this.loadBugs()
  },
  methods: {
    loadBugs() {
      bugService.query(this.filterBy).then(({ totalPages, filteredBugs }) => {
        console.log('filteredBugs', filteredBugs)
        console.log('user', this.user)
       let bugs = filteredBugs.filter((bug) =>  {
        return  bug.creator._id === this.user._id
        })
        this.totalPages = totalPages
        this.bugs = bugs
      })
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
      this.loadBugs()
    },
  },
  components: {
    bugList,
  },
}