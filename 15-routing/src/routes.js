import Home from './components/Home.vue';
import Header from "./components/Header.vue";

/**
 * Lazy loading
 */
const User = resolve => {
    require.ensure(['./components/user/User.vue'], () => {
        resolve(require('./components/user/User.vue'))
    }, 'user');
};

const UserDetail = resolve => {
    require.ensure(['./components/user/UserDetail.vue'], () => {
        resolve(require('./components/user/UserDetail.vue'))
    });
};

const UserEdit = resolve => {
    require.ensure(['./components/user/UserEdit.vue'], () => {
        resolve(require('./components/user/UserEdit.vue'))
    });
};

const UserStart = resolve => {
    require.ensure(['./components/user/UserStart.vue'], () => {
        resolve(require('./components/user/UserStart.vue'))
    });
};
/** */

export const routes = [
    {
        path: '', name: 'home', components: {
            default: Home, 'header-top': Header
        }
    },
    {
        path: '/user', components: {
            default: User, 'header-bottom': Header
        }, children: [
            { path: '', component: UserStart },
            { path: ':id', component: UserDetail, beforeEnter: (to, from, next) => { console.log('user detail'); next() } },
            { path: ':id/edit', component: UserEdit, name: 'user_edit' }
        ]
    },
    {
        path: '/redirect-me', redirect: { name: 'home' }
    },
    {
        path: '*', redirect: { name: 'home' }
    }
];