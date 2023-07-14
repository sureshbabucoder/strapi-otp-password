module.exports ={
    routes:[
        {
            method: "POST",
            path: "/token",
            handler: "token.IsValidUser",
            config:{
                auth:false
            }
        }
    ]
  }