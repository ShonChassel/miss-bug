import { userService } from "../services/user.service.js"
import { eventBus } from "../services/eventBus-service.js"
import loginSignup from "../cmps/login-signup.cmp.js"

export default {
    template: `
        <header>
            <h1>Miss Bug</h1>    
        </header>
        <section v-if="user">
            <h2><router-link :to="'/bug/userDetails'">Welcome:{{user.fullname}}</router-link></h2>
            <!-- <router-link :to="'/bug/' + user._id">userDetails</router-link> -->
            <button @click="logout">Logout</button>
        </section>
        <section v-else>
            <login-signup @onChangeLoginStatus="onChangeLoginStatus"></login-signup>
        </section>
    `,
    data() {
        return {
            user: userService.getLoggedInUser(),
        }
    },
    methods: {
        onChangeLoginStatus() {
            this.user = userService.getLoggedInUser()
            console.log('this.user', this.user)
        },
        logout() {
            userService.logout()
                .then(() => { this.user = null })
        },
        // details() {
        //     this.$router.push('/bug +' this.user._id)
        // }
    },
    components: {
        loginSignup
    }
}
