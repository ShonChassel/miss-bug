'use strict'

export default {
  template: `
        <section class="bug-filter">
            <span>Filter by title: </span>
            <input @input="setFilterBy" type="text" v-model="filterBy.title">
        </section>
    `,
  data() {
    return {
      filterBy: {
        title: '',
      },
    }
  },
  methods: {
    setFilterBy() {
      this.$emit('setFilterBy', this.filterBy)
    },
  },
}
