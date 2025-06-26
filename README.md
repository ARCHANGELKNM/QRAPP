This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


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

 To set up Kinde on your computer , follow the steps described here : https://docs.kinde.com/authenticate/authentication-methods/set-up-user-authentication/



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