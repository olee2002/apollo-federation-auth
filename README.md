# apollo-federation-auth

This is further developed based on this repo: https://github.com/ewong/stc-23-apollo-federation.
Tutorial: https://www.youtube.com/watch?v=8OH4WieIKz4.

-The file structure and starting script has been reconfigured.

-And additional stuff is added to run the server without adding .env for the time being.

-Example query is added

Run `npm i && npm run server`

This server should be able to get tested in postman.
Some of the package versions are quite out-dated, we will need some work to have them up-to-dated

GENERAL
node packages: apollo-server-express dotenv express graphql

GATEWAY
node packages: @apollo/gateway 

AUTH
node package: @apollo/federation

