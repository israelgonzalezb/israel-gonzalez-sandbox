## Readme

This is a simple express app that serves an HTML page to search Dwolla customers. Use the Heroku button below to quickly try it out.


[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


### Instructions

1. If you have a Dwolla Sandbox Account, [log in](https://accounts-sandbox.dwolla.com/login). Otherwise, [create an account](https://accounts-sandbox.dwolla.com/sign-up) and follow the verification instructions.
3. On your [Dashboard](https://dashboard-sandbox.dwolla.com/), click **≡ Menu -> Applications**.
4. From the [Applications](https://dashboard-sandbox.dwolla.com/applications-legacy) page, copy the ```key``` and ```secret``` credentials and set them as the environment variables ```DWOLLA_KEY``` and ```DWOLLA_SECRET```.

#### Install
`yarn install`

#### Run server
`yarn start`

The server runs on port 3000 by default. Change that by setting the PORT environment variable.

On first visit to `/`, the server will create 20 fake customers. To manually run the user creation script, visit `/create`. The server then redirects you to the index page.

