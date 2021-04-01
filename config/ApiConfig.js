const API_URL ='https://loginflow.herokuapp.com/'
const API_CONFIG ={
    login:{
        path :"login",
        method : "POST"
    },
    signup:{
        path :"signup",
        method : "POST"
    }
}

const HEADER ={
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export { HEADER, API_CONFIG, API_URL}