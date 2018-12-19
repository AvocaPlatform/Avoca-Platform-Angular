export const navItems = [
    {
        name: "Dashboard",
        url: "/dashboard",
        icon: "icon-speedometer",
        badge: {
            variant: "info",
            text: "NEW"
        }
    },
    {
        title: true,
        name: "Module"
    },
    {
        name: "Users",
        url: "/users",
        icon: "icon-user",
        children: [
            {
                name: "View users",
                url: "/users",
                icon: "icon-people"
            },
            {
                name: "Create user",
                url: "/users/create",
                icon: "icon-user-follow"
            },
        ]
    },
    {
        title: true,
        name: "Settings"
    },
    {
        name: "Colors",
        url: "/theme/colors",
        icon: "icon-drop"
    },
    {
        name: "Typography",
        url: "/theme/typography",
        icon: "icon-pencil"
    },
    {
        name: "Download Avoca",
        url: "http://avoca.io",
        icon: "icon-cloud-download",
        class: "mt-auto",
        variant: "success"
    },
];
