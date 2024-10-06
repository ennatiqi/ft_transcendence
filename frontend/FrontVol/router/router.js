import Dashboard from "../views/dashboard.js";
import Error404 from "../views/404.js";
import Chat from "../views/chat.js";
import Dash from "../views/dash.js";
import Game from "../views/game.js";
import Tournament from "../views/tournament.js";
import Online_Game from "../views/online-game.js";
import Online_Popup from "../views/online-popup.js";
import Home from "../views/home.js";
import Login from "../views/login.js";
import Loading from "../views/loading.js";
import OTP from "../views/otp.js"
import Settings from "../views/settings.js";


export const Routes = [
    {
        path: '/error404',
        component: Error404,
        auth: false
    },
    {
        path: '/otp',
        component: OTP,
        auth: false
    },
    {
        path: '/',
        component: Home,
        auth: false
    },
    {
        path: '/login',
        component: Login,
        auth: false
    },
    {
        path: '/dashboard',
        component: Dash,
        auth: true
    },
    {
        path: '/dashboard/chat',
        component: Chat,
        auth: true
    },
    {
        path: '/dashboard/online-game',
        component: Online_Game,
        auth: true
    },
    {
        path: '/dashboard/tournament',
        component: Tournament,
        auth: true
    },
    {
        path: '/dashboard/settings',
        component: Settings,
        auth: true
    },
    {
        path: '/loading',
        component: Loading,
        auth: false
    },
];

class Router {
    constructor() {
        this.routes = Routes;
        this.active_path = window.location.pathname;
        this.route = this.matchRoute(this.active_path);
        
        // Handle browser navigation (back/forward)
        window.addEventListener("popstate", () => {
            this.active_path = window.location.pathname;
            this.route = this.matchRoute(this.active_path);
            this.render();
        });
    }

    matchRoute(path) {
        return this.routes.find(route => {
            const regex = this.pathToRegex(route.path);
            return regex.test(path);
        });
    }

    pathToRegex(path) {
        const pattern = path.replace(/:[^\s/]+/g, '([^\\s/]+)');
        return new RegExp(`^${pattern}$`);
    }

    render() {
        if (!this.route) {
            this.route = this.routes.find(route => route.path === "/error404");
            const curr_page = new this.route.component();
            let content_ = document.getElementById("app");
            content_.innerHTML = '';
            if (content_) {
                content_.appendChild(curr_page);
            }
            return;
        }

        const curr_page = new this.route.component();
        let content_ = document.getElementById("app");
        
        
        content_.innerHTML = '';
        
        let path = this.active_path.split("/");
        // console.log("start");
        if (path[1] == "dashboard") {
            // if (!content_.innerHTML.includes('<dashboard-page></dashboard-page>')) {
                // console.log("new one");
                content_.innerHTML = '<dashboard-page></dashboard-page>';
            // }
            content_ = document.getElementById("dashscripte");
            // content_.innerHTML = '';
        }
        // else
        // {
        //     console.log("fresh");
        //     content_.innerHTML = '';
        // }

        if (content_) {
            content_.appendChild(curr_page);
        }
    }

    async navigate(path) {
        const route = await this.loadDataForRoute(path);
    
        window.history.pushState({}, "", path);
        this.route = route;
        this.render();
    }
    async loadDataForRoute(path) {

        if (path.endsWith('/') && path != '/') {
            path = path.slice(0, -1);
        }

        const route = this.matchRoute(path);
        
        if (route && route.path === '/login' && route.path === '/' && await this.isAuthenticated())
            path = '/dashboard';
        if (route && route.auth && !(await this.isAuthenticated())) {
            path = '/login';
        }

    
        this.active_path = path;
    
        return this.matchRoute(this.active_path);
    }

    async isAuthenticated() {
        let mydata = null;
        try {
            const response = await fetch('/api/main/data/', {
                method: "get",
                credentials: "include"
            });
            mydata = await response.json();
        } catch (error) {
            console.error("Error:", error);
        }
        return mydata && mydata.id;
    }
}

export const router = new Router();


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        const aTag = e.target.closest('a[data-link]');
        if (aTag) {
            e.preventDefault();
            router.navigate(aTag.getAttribute('href'));
        }
        
    });
    router.navigate(window.location.pathname);
});

