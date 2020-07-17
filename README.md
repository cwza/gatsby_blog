# cwza's technical blog

## How to add or modify tab pages
1. Add or modify mdx files under ./src/pages
2. Add \<Link to="mdx file name from 1"> to ./src/gatsby-theme-chronoblog/site-header.mdx 

## How to add new post
* Add md file or folder under ./content/links or ./content/notes or ./content/posts

## How to preview
``` sh
npm install
npm start
```

## How to deploy
1. Link this repository to https://vercel.com/dashboard
2. Just push code to origin/master and vercel will automatically deploy it to production.