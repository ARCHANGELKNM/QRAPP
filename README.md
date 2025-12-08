
## What You'll Need

For this project to be able to run on your mechine you'll need  the following libraries , frameworks and technologies:
````bash
-> React
-> Next js
-> kinde
-> @zxing/browser
-> Shadcn components: Card , Dialog , Input , Button , avatar , Sidebar1 
-> Tailwind CSS
-> Neon
-> Drizzle orm
-> Framer-motion
-> Qr-code-styling
-> Lucide-react
-> AOS
````

 ## Setting Up Kinde

 To set up Kinde on your computer , follow the steps described here : https://docs.kinde.com/authenticate/authentication-methods/set-up-user-authentication/  or if you're too busy for the docs follow the following steps:

 - Step 1 : Create a kinde account on their official site https://app.kinde/rigister  , then you may register or create what they call a business.

 - Step 2: Add your callback URls; http://localhost:3000/api/auth/kinde_callback  and your Logout redirect URls: https://localhost:3000 and save your changes

 - Step 3 :  In your terminal run the following command ```` npm i @kinde-oss/kinde-auth-nextjs````

 - Step 4 : You can then create a .env.local file in your root directory  where you can paste in yout Client id, Client secret ,etcthese deitails are provided in your dashboard

 - Step 5 :  And you are done . That was simple right ? 

## Setting up the Neon

 ## Setting Up Shadcn 

 to set up Shadcn read this : https://ui.shadcn.com/docs/installation/next and then install the required components under the guidance of the docs 

## Setting Up The NPM Packages

To install the npm packages run the following commands in your terminal:

 ````bash
 npm i qr-code-styling 
 npm i @zxing/browser
 npm i framer-motion
 npm i react-icons
 npm i aos 
 
````