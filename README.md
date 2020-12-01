# BCEdAccess MLA Letter Generator
An Angular web app that allows you to send custom emails to your BC MLAs automatically.

## Motivation
Created in order to be able to easily send emails to MLAs without having to look up their emails. All you need to send a letter is your name, email address, and postal code and the Letter Generator will automatically find your MLA and send the email for you.

## Framework

 - [Angular](https://angular.io/)
 - [Angular Material](https://material.angular.io/)
 - [Express](https://expressjs.com/)
 - [Heroku](https://www.heroku.com/)
 - [SendinBlue](https://www.sendinblue.com/)
 
 
 However, you can use any email and hosting service that works best for you!
 

# Installation

Firstly, clone/fork/download this repository.

In order to change the text in the description at the top of the page, update the HTML strings within [src/app/components/textbox/textbox.component.ts](https://github.com/e-newton/MLA-Letter-Generator/blob/master/src/app/components/textbox/textbox.component.ts)

To change the default text in the actual letter, go to [src/app/components/lettertext.ts](https://github.com/e-newton/MLA-Letter-Generator/blob/master/src/app/components/lettertext.ts) and update the text field. This string however is raw text, but in the future a full rich text editor will be included which will support HTML tags. You can add in your own markers where the data will be changed.  For example [MLA\'s name will go here] will be replaced with the MLA's name  before the email is sent. You can look in submitbutton.compontent.ts in order to see all the tags.  You can change them as well, but the text must match exactly.

This application uses a express backend proxy API on port 8080 (Heroku's default port). Please make sure that your hosting service will support this or change the proxy port in order to accommodate. 

## SendInBlue Requirement:
This project on its own requires an active SendInBlue account in order to send the email on the user's behalf. The account tier you will need is dependent on the amount of traffic you expect. The free tier will work fine if you expect low traffic. Please make sure to add your transactional email information into the .env file (see the next section).

## ENV Setup
In this repository you will fine a file called .env-sample. This is a file to place your environment variables for the app to run. Within it you will place your SendInBlue API information as well as a variable called PRODUCTION to change whether the app is hosted live, or running locally on your machine. **Set production to 1 is your system variables within your hosting service**. Once you have entered the information, rename the file to .env .

### Running the service for development
To make the server run for MacOS for development, in the console run the command

    npm run-script development
For windows:

    npm run-script development_windows

## Heroku Deployment
This app is designed to be hosted and deployed through [Heroku](https://www.heroku.com/) which comes with a free tier that is enough to host this app. Create an account and create a new app. To deploy your app you can either deploy the app locally through the HerokuCLI or if you have your code stored on GitHub then you can connect your GitHub account and deploy the master branch of your repository. Once you're done and Heroku finishes deploying, you are good to go!


## Need Help?
Feel free to either start an issue on this repository, or email tech@bcedaccess.com

## Contribute
This is a completely open source project and anyone is free to send a pull request for any features they think to be useful

## Credits
This was created by [Eric Newton](https://github.com/e-newton/) and [BCEdAccess](https://bcedaccess.com/)
