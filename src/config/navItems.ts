export default [
    {
        "label": "Home",
        "to": "/",
        "roles": ["admin", "owner", "agent", "user"]
    },
    {
        "label": "Entry",
        "to": "entry",
        "roles": ["admin", "owner", "agent", "user"]
    },
    {
        "label": "Admins",
        "to": "owner/manage-admins",
        "roles": ["owner"]
    },
    {
        "label": "Agents",
        "to": "manage-agents",
        "roles": ["admin", "owner", "agent"]
    }
]