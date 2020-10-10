import React from "react";
export type IDataRouter = {
    component:any,
    path:string,
    title?:string,
    exact?:boolean,
    childrens?:IDataRouter[]
} 
export default [
    {
        path: "/login",
        title: "登录",
        exact: true,
        component: React.lazy(() => import("@/pages/login/login"))
    },
    {
        path: "/",
        title: "组件",
        component: React.lazy(() => import("@/pages/layout")),
        childrens: [{
                path: "/",
                title: "简介",
                exact: true,
                component: React.lazy(() => import("@/pages/home"))
            },
            {
                path: "/button",
                title: "button",
                exact: true,
                component: React.lazy(() => import("@/example/ByButton"))
            },
            {
                path: "/carousel",
                title: "carousel",
                exact: true,
                component: React.lazy(() => import("@/example/ByCarousel"))
            },
            {
                path: "/checkbox",
                title: "checkbox",
                exact: true,
                component: React.lazy(() => import("@/example/ByCheckbox"))
            },
            {
                path: "/radio",
                title: "radio",
                exact: true,
                component: React.lazy(() => import("@/example/ByRadio"))
            },
            {
                path: "/switch",
                title: "switch",
                exact: true,
                component: React.lazy(() => import("@/example/BySwitch"))
            },
            {
                path: "/tabs",
                title: "tabs",
                exact: true,
                component: React.lazy(() => import("@/example/ByTabs"))
            },
            {
                path: "/scroll",
                title: "scroll",
                exact: true,
                component: React.lazy(() => import("@/example/ByScroll"))
            },
            {
                path: "/pagination",
                title: "pagination",
                exact: true,
                component: React.lazy(() => import("@/example/ByPagination"))
            },
            {
                path: "/message",
                title: "message",
                exact: true,
                component: React.lazy(() => import("@/example/ByMessage"))
            },
            {
                path: "/modal",
                title: "modal",
                exact: true,
                component: React.lazy(() => import("@/example/ByModal"))
            },
            {
                path: "/tree",
                title: "tree",
                exact: true,
                component: React.lazy(() => import("@/example/ByTree"))
            },
            

        ]
    }
]