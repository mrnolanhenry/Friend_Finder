// ### Reminder: Submission on BCS

// * Please submit both the deployed Heroku link to your homework AND the link to the Github Repository!

// ### Hosting on Heroku

// Now that we have a backend to our applications, we use Heroku for hosting. Please note that while **Heroku is free**, it will request credit card information if you have more than 5 applications at a time or are adding a database.

// Please see [Heroku’s Account Verification Information](https://devcenter.heroku.com/articles/account-verification) for more details.

// See the [Supplemental Heroku Deployment Guide](../../03-Supplemental/HerokuGuide.md) for in-detail deployment instructions.

let express = require("express");

let app = express();
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });