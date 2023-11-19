require('dotenv').config()

// Path: next.config.js
module.exports = {
    reactStrictMode: true,
    env: {
        REACT_APP_API_URL : process.env.REACT_APP_API_URL,
        
    }

}

