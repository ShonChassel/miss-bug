'use strict'

import bugPreview from './bug-preview.cmp.js'

export default {
  props: ['bugs'],
  template: `
    <section v-if="bugs" className="bug-list">                    
      <bug-preview v-for="bug in bugs" :bug="bug" :key="bug._id" @removeBug="$emit('removeBug', $event)" />
    </section>
    <section v-else class="bug-list">Yay! No Bugs!</section>
    `,
  methods: {},
  components: {
    bugPreview,
  },
}
