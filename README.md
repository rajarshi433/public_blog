# public_blog
A public blog creator using MERN stack with ImageKit CDN to store and render images to the user more faster and efficiently

## Start Client - 
1. New terminal
2. cd client
3. npm run dev


## Start Server -
1. New terminal
2. cd server
3. nodemon ./index.js


## env setup
1. Create one **.env** in the client root directory
2. Add these firebase configurations variables:
     -  __VITE_REACT_API_KEY__ = "your value here"
     - __VITE_REACT_AUTH_DOMAIN__ = "your value here"
     - __VITE_REACT_PROJECT_ID__ = "your value here"
     - __VITE_REACT_STORAGE_BUCKET__ = "your value here"
     - __VITE_REACT_MESSAGING_SENDER_ID__ = "your value here"
     - __VITE_REACT_APP_ID__ = "your value here"
         
      
3. Create on **.env** in the client root directory
4. Add these mongoDB configurations variables: 
      - __DB_URI__ = your own mongoDB uri
      
5. Add these ImageKit configurations variables:
      - __PUBLIC_KEY__ = "your value here"
      - __PRIVATE_KEY__ = "your value here"
      - __URL_ENDPOINT__ = "your value here"
