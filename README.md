### Website Live: https://find-your-job.vercel.app/

[Read this in portuguese.](README.pt.md)

## Screenshots
<div style="display: flex, margin: 20px">
<img src="https://user-images.githubusercontent.com/52260932/193148565-bcac03a4-9cba-49a7-baa4-3fd244387db2.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/193148414-ef4e9b17-108d-41e2-8b9c-4f65e8ced5ef.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/193150461-cc023822-40b0-442b-b2ce-6ba7a0910b85.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/193148683-27d56b61-6e47-4639-be00-c9d456119784.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/193154238-5b893770-8d21-4940-bc18-43bff488cc38.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/193150275-3af78e52-6c8a-4078-9dfc-67e6d268bd51.png" width="49%">

</div>

## Description
#### Website project with the purpose of helping people find their jobs. It has practical features including:

•	Jobs integration via [GraphQL.jobs API](https://graphql.jobs/) creating queries with Apollo Client. Adding to that a search and filter system made from scratch, makes the website display only information that is relevant to the particular user, helping him find the job he wants.

•	Developed an auth system using TypeGraphQL and Apollo Server validating the user with JWT, giving him safety accessing his account as well as editing the data related to it, giving that is stored on MySQL hosted on RDS (AWS) and the images on S3 (AWS).

•	Usage of version control with Git Flow implementing features and releases on development allowing any person to see the history and understand the changes done on the project making it easier to identify each one.

•	Project development made using Typescript, helping building the complex codes as well as productivity.

## How to run:

<strong>1.</strong> Need to install Node on your computer.</br>
<strong>2.</strong> Clone the project with git:</br> 
&emsp; - Open git bash or the terminal with git installed globally.  
&emsp; - Browse to the folder that you want to have the project cloned.  
&emsp; - Run command: git clone https://github.com/BrunoR02/find-your-job.git  
<strong>3.</strong> Enter project folder in the terminal (cd [folder]).</br>
<strong>4.</strong> Run: "npm install" to install dependencies.</br>
<strong>5.</strong> Run: "npm run dev" to initiate the project on http://localhost:3000</br>

