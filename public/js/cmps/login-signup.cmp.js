// import { showErrorMsg, showSuccessMsg } from "../services/eventBus-service.js"
import { userService } from "../services/user.service.js"

export default {
    template: `
    <section class="login-signup">
        <h3>Login/Signup</h3>

        <form  @submit.prevent="login">
            <h2>Login</h2>
            <input type="text" v-model="credentials.username" placeholder="Username" />
            <input type="password" v-model="credentials.password" placeholder="Password" />
            <button>Login</button>
        </form>
        <hr />

        <form  @submit.prevent="signup">
            <h2>Signup</h2>
            <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
            <input type="text" v-model="signupInfo.username" placeholder="Username" />
            <input type="password" v-model="signupInfo.password" placeholder="Password" />
            <button>Signup</button>
        </form>
    </section>
    `,
    data() {
        return {
            credentials: {
                username: 'puki',
                password: '123'
            },
            signupInfo: {
                fullname: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        signup() {
            userService.signup(this.signupInfo)
                .then(user => {
                    console.log('user', user);
                    // showSuccessMsg(`welcome ${user.fullname}`)
                    this.$emit('onChangeLoginStatus',user)
                })
                .catch(err => {
                    console.log('Cannot signup', err)
                    // showErrorMsg(`Cannot signup`)
                })
        },
        login() {
            console.log('this.credentials', this.credentials)
            userService.login(this.credentials)
                .then(user => {
                    // showSuccessMsg(`welcome ${user.fullname}`)
                    this.$emit('onChangeLoginStatus',user)
                })
                .catch(err => {
                    console.log('Cannot login', err)
                    // showErrorMsg(`Cannot login`)
                })
        },
    }

}
