export default [
    {
        "label": "Home",
        "to": "/",
        "roles": ["admin", "owner", "agent", "user"]
    },
    {
        "label": "Entry",
        "to": "/entry",
        "roles": ["admin", "owner", "agent"]
    },
    {
        "label": "Admins",
        "to": "owner/manage-admins",
        "roles": ["owner"]
    },
    {
        "label": "Agents",
        "to": "/entry",
        "roles": ["admin", "owner"]
    },
    {
        "label": "About",
        "to": "/about",
        "roles": ["admin", "owner", "agent", "user"]
    },
    {
        "label": "Contact",
        "to": "/contact",
        "roles": ["admin", "owner", "agent", "user"]
    }
]