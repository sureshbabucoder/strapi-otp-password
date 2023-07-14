// getting the token from env file 
const bcrypt = require('bcrypt');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::token.token', ({ strapi }) => ({
  async IsValidUser(ctx) {
    const { Mobile,userPassword } = ctx.request.body;
     // getting the mobile from the request body 
     //  console.log(Mobile,userPassword)
    const users = await strapi.query('plugin::users-permissions.user').findMany();// getting the users from  database
    console.log(users)
    const singleUser=users.filter((user)=>user.mobile===Mobile) // filter the users by mobile 
    let tokenjwt;
    // console.log(singleUser)
    // password comparision 

    // getting token from a single user
    const modifiedData = singleUser.map(async (obj) => {
        const { token, password, username,Mobile, ...rest } = obj;
        const storedHashedPassword = password; // Retrieve the hashed password from your database
        const userEnteredPassword = userPassword; // Replace with the user's entered password
      
        try {
          const result = await bcrypt.compare(userEnteredPassword, storedHashedPassword);
          if (result === true && Mobile===Mobile) {
            // Passwords match, log the user in
            const match = "Password Matched";
            const credentials = { password: userEnteredPassword, identifier: username };
            return { match, credentials };
          } else {
            // Passwords don't match, reject the login attempt
            throw new Error('Invalid credentials');
          }
        } catch (err) {
          console.error('Error comparing passwords:', err);
          // Reject the login attempt
          throw new Error('Internal Server Error');
        }
      });
      
      try {
        const results = await Promise.all(modifiedData);
        // Send the results array as a response to the client
        ctx.send(results);
      } catch (err) {
        // Handle any errors that occurred during the password comparison
        console.error(err);
        ctx.send({ error: 'Internal Server Error' });
      }
  },
}))

