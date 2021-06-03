module.exports = {
    treatments: [ { descr: "Limpieza Dental" },
        { descr: "Blanqueamiento de Dientes" },
    ],
    states: {
        0:'Approved',
        1:'Pending',
        2:'Completed',
        3:'Cancelled'
    },
    MAX_AGE_COOKIE: 1000 * 60 * 10,
    mailCredentials: {
        mail: 'info@dentalfriends.ec',
        passwordHash: 'Bd6JUrv8nD30OGfwBQOF+g==', 
        key: 'dentalfriends.ec'
    }

}