### Website Live: https://find-your-job.vercel.app/

[Read this in portuguese.](README.pt.md)

## Screenshots
<div style="display: flex, margin: 20px">
<img src="https://user-images.githubusercontent.com/52260932/208268316-716f4c01-fd41-4c35-b31e-322aa47ace04.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/208268579-97115a96-ef7e-416f-9580-3382ea5ea1b7.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/208268599-a63c6fc0-83be-4b69-a5d9-c6c56888f7e0.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/208268619-667934bf-24b5-41fb-8d56-7bb51dacc427.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/208268678-63666652-3a8d-466a-8f41-fa631c974c14.png" width="49%">
<img src="https://user-images.githubusercontent.com/52260932/208268695-3352a69c-2a39-4463-bc9f-cde0a2931f6b.png" width="49%">

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

