
## What You'll Need

For this project to be able to run on your mechine you'll need  the following libraries , frameworks and technologies:
````bash
-> React
-> Next js
-> kinde
-> @zxing/browser
-> Shadcn components: Card , Dialog , Input , Button , avatar , Sidebar1 
-> Tailwind CSS
-> Xata
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



 ## Setting Up Xata

 To set up set up Xata , read the documentation described here : https://lite.xata.io/docs/getting-started/nextjs. But if you think that take up too much time follow this guide. Take note for this to work you need to have a Xata accounnt , a Xata workspace , database and a table :

 - Step 1:   Install Xata using the commands ```` npm install @xata.io/cli or npm install -g @xata.io/cli ````

-  Step 2:   Run this command for you to log in  ```` npx xata auth login ````

 - Step 3:   Create a xata workspace then create a database then within that database create a table and create a column called UserName  another one called UserId and another one called qrContent. Once that is done define your schema for that table as follows:

 - UserName: String , can be null 
 -  UserId: String , can be null 
 -  qrContent: String , can be null 
 
-  Step 4:   Create .xatarc and src/xata.js file by running the command following command and select the workspace and database where you create the create in Step 3 table  ```` npx xata init and npx xata codegen```` 
            
            
 

 ## Setting Up Shadcn 

 to set up Shadcn read this : https://ui.shadcn.com/docs/installation/next and then install the required components under the guidance of the docs 

## Setting Up The NPM Packages

To install the npm packages run the following commands in your terminal:

 ````bash
 npm i qr-code-styling 
 npm i @zxing/browser
 npm i Framer-motion
````