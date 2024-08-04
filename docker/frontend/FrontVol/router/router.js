

import Dashboard from "../views/dashboard.js";
import Error404 from "../views/404.js";
import Chat from "../views/chat.js";
import Contact from "../views/contact.js";
import Dash from "../views/dash.js";
import Game from "../views/game.js";
import Home from "../views/home.js";
import Login from "../views/login.js";



export const Routes = [
    {
        path: '/error404',
        component: Error404
    },
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/contact',
        component: Contact
    },
    // {
    //     path: '/dashboard',
    //     component: Dash,
    //     children: [
    //         {
    //             path: '/chat',
    //             component: Chat
    //         },
    //         {
    //             path: '/game',
    //             component: Game
    //         }
    //     ]
    // }
    {
        path: '/dashboard',
        component: Dash
    },
    {
        path: '/dashboard/chat',
        component: Chat
    },
    {
        path: '/dashboard/game',
        component: Game
    },
    
]

class Router {
    constructor() {
        this.routes = Routes;
        this.active_path = window.location.pathname;
        this.route  = this.routes.find(route => route.path === this.active_path);
    }
    
    
    render() {
        if (!this.route) {
            this.route = this.routes.find(route => route.path === "/error404");
        }
        if (this.active_path != window.location.pathname) {
            window.history.pushState({}, "", this.active_path);
        }

        const curr_page = new this.route.component();
        
        let content_ = document.getElementById("app");
        content_.innerHTML = '';
        if (this.active_path === "/dashboard/chat" || this.active_path === "/dashboard/game" || this.active_path === "/dashboard")
        {
            content_.innerHTML = '<dashboard-page></dashboard-page>';
            content_ = document.getElementById("dashscripte");
        }
        if (content_) {
            content_.appendChild(curr_page);
        }
    }


    navigate(path) {

        this.active_path = path;
        this.route = this.routes.find(route => route.path === this.active_path);
        this.render();
    }
}
export const router = new Router();


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            router.navigate(e.target.getAttribute('href'));
        }
    });
    router.navigate(window.location.pathname);
});

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("a[data-link]")) {
            e.preventDefault();
            e.target.getAttribute('href');
        }
    });
});

