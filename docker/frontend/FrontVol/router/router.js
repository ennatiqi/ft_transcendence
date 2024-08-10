

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
        component: Error404,
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
        path: '/contact',
        component: Contact,
        auth: false
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
        component: Dash,
        auth: true
    },
    {
        path: '/dashboard/chat',
        component: Chat,
        auth: true
    },
    {
        path: '/dashboard/game',
        component: Game,
        auth: true
    },
    
]

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
        }

        const curr_page = new this.route.component();
        let content_ = document.getElementById("app");
        content_.innerHTML = '';

        if (this.active_path.startsWith("/dashboard")) {
            content_.innerHTML = '<dashboard-page></dashboard-page>';
            content_ = document.getElementById("dashscripte");
        }

        if (content_) {
            content_.appendChild(curr_page);
        }
    }

    async navigate(path) {
        const route = this.matchRoute(path);
        if (route && route.auth && !(await this.isAuthenticated())) {
            path = '/login';
        }

        this.active_path = path;
        this.route = this.matchRoute(this.active_path);

        // Update URL and render without reloading
        window.history.pushState({}, "", this.active_path);
        this.render();
    }

    async isAuthenticated() {
        let mydata = null;
        try {
            const response = await fetch('http://localhost:8000/main/data/', {
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
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            router.navigate(e.target.getAttribute('href'));
        }
    });
    router.navigate(window.location.pathname);
});
