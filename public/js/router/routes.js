import bugApp from '../pages/bug-app.cmp.js'
import bugDetails from '../pages/bug-details.cmp.js'
import userDetails from '../pages/user-details.cmp.js'
import bugEdit from '../pages/bug-edit.cmp.js'


const routes = [

    {
        path: '/bug',
        component: bugApp,
    },
    {
        path: '/bug/edit/:bugId?',
        component: bugEdit
    },
    {
        path: '/bug/:bugId',
        component: bugDetails
    },
    {
        path: '/bug/userDetails',
        component: userDetails
    },
]

export const myRouter = VueRouter.createRouter({
    routes, history: VueRouter.createWebHashHistory()
})