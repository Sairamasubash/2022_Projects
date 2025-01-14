// Here we are requiring the user.js file called User.
var User = require ('../models/user.js');

// Here we are requiring the task.js file called Task.
var Task = require ('../models/task.js');

var defaultAssignedUser = "";   // Here we are creating a variable called defaultAssignedUser.

var allPromise1 = Promise.all ([]);   // Here we are creating a vairable called allPromise1.

var allPromise2 = Promise.all ([]);   // Here we are creating a vairable called allPromise2.

var allPromise3 = Promise.all ([]);   // Here we are creating a vairable called allPromise3.

var allPromise4 = Promise.all ([]);   // Here we are creating a vairable called allPromise4.

module.exports = function (router)   // Here we are creating a function that exports this module.
{
    var usersRoute = router.route ('/users');   // Here we are creating a variable called usersRoute.

    usersRoute.post (function (request, response)   // Here we are creating the post call for usersRoute.
    {
        var postUser = new User ();   // Here we are creating a vairable called postUser.
        
        var body = request.body;   // Here we are creating a vairable called body.

        var bodyName = body.name;   // Here we are creating a vairable called bodyEmail.

        var bodyEmail = body.email;   // Here we are creating a vairable called bodyEmail.

        var bodyPendingTasks = body.pendingTasks;   // Here we are creating a vairable called bodyPendingTasks.

        var responseStatus201 = response.status (201);   // Here we are creating a vairable called responseStatus201.

        var responseStatus400 = response.status (400);   // Here we are creating a vairable called responseStatus400.

        var responseStatus500 = response.status (400);   // Here we are creating a vairable called responseStatus500.

        // If the name field is not defined.
        if (!('name' in body && bodyName !== undefined)) 
        {
            // Here we are returning status code of 400 (Bad Request).
            return responseStatus400.send
            ({
                // Here is the Bad Request message.
                message: 'Bad Request: Please Provide A Name.',
                data: []   // Here we are showing the data, which is [].
            });
        } 
        else   // If the name field is defined.
        {
            postUser.name = bodyName;   // Here we are setting postUser.name equal to bodyName.
        }

        // If the email field is not defined.
        if (!('email' in body && bodyEmail !== undefined)) 
        {
            // Here we are returning status code of 400 (Bad Request).
            return responseStatus400.send
            ({
                // Here is the Bad Request message.
                message: 'Bad Request: Please Provide An Email.',
                data: []   // Here we are showing the data, which is [].
            });
        } 
        else   // If the email field is defined.
        {
            // Here we are using .findOne on User.
            User.findOne ({email: bodyEmail}).exec ().then (function (checkForEmail) 
            {
                // If checkForEmail does not equal null.
                if (!(checkForEmail == null)) 
                {
                    // Here we are returning status code of 400 (Bad Request).
                    return responseStatus400.send
                    ({
                        // Here is the Bad Request message.
                        message: 'Bad Request: You Have Already Used This Email, Please Provide A Different Email.',
                        data: []   // Here we are showing the data, which is [].
                    });
                } 
                else // If checkForEmail equals null.
                {
                    postUser.email = bodyEmail;   // Here we are setting postUser.email equal to bodyEmail.

                    //
                    if ('pendingTasks' in body && bodyPendingTasks !== undefined) 
                    {
                        // Here we are using .forEach on bodyPendingTasks.
                        bodyPendingTasks.forEach (function (taskId) 
                        {
                            // Here we are using .push on [].
                            [].push (Task.findById (taskId).exec ());
                        });
                    }

                    // Here we are using .then on allPromise1.
                    allPromise1.then (function (emailInformation) 
                    {
                        // Here we are using .forEach on emailInformation.
                        emailInformation.forEach (function (taskInformation) 
                        {
                            // If taskInformation does not equal null.
                            if (taskInformation != null) 
                            {
                                // Here we are using .push on [].
                                [].push (taskInformation.id);
                            }
                        });

                        // Here we are using .save on postUser.
                        postUser.save ().then (function (queryResults) 
                        {
                            // Here we are using .forEach on queryResults.pendingTasks.
                            queryResults.pendingTasks.forEach (function (newTaskId) 
                            {
                                // Here we are using .push on [].
                                [].push (Task.findById (newTaskId).exec ());
                            });

                            // Here we are using .then on allPromise2.
                            allPromise2.then (function (moreTasks) 
                            {
                                // Here we are using .forEach on moreUsers.
                                moreTasks.forEach (function (taskInformation2) 
                                {
                                    // If taskInformation2.assignedUser does not equal defaultAssignedUser.
                                    if (taskInformation2.assignedUser !== defaultAssignedUser) 
                                    {
                                        // Here we are using .push on [].
                                        [].push (User.findById (taskInformation2.assignedUser).exec ());
                                    }

                                    // Here we are using .then on allPromise3.
                                    allPromise3.then (function (moreUsers) 
                                    {
                                        // Here we are using .forEach on moreUsers.
                                        moreUsers.forEach (function (userInformation) 
                                        {
                                            // Here we are using .remove on userInformation.pendingTasks.
                                            userInformation.pendingTasks.remove (taskInformation2.id);
                                            
                                            // Here we are using .push on [].
                                            [].push (userInformation.save ());
                                        });
                                    });

                                    // Here we are setting taskInformation2.completed equal to false.
                                    taskInformation2.completed = false;

                                    // Here we are setting taskInformation2.assignedUser equal to queryResults.id.
                                    taskInformation2.assignedUser = queryResults.id;

                                    // Here we are setting taskInformation2.assignedUserName equal to queryResults.name.
                                    taskInformation2.assignedUserName = queryResults.name;

                                    // Here we are using .push on [].
                                    [].push (taskInformation2.save ());
                                });

                                // Here we are using .then on allPromise4.
                                allPromise4.then (function () 
                                {
                                    // Here we are returning status code of 201 (Created).
                                    return responseStatus201.send
                                    ({
                                        // Here is the Created message.
                                        message: 'Created: A New User Has Been Created.',
                                        data: queryResults   // Here we are showing the data, which is queryResults.length.
                                    });
                                });
                            });
                        })
                        .catch (function (ISE)   // Here we are catching an Internal Server Error.
                        {
                            // Here we are returning status code of 500 (Internal Server Error).
                            return responseStatus500.send
                            ({
                                // Here is the Internal Server Error message.
                                message: 'Internal Server Error: There Is An Server Error.',
                                data: []   // Here we are showing the data, which is [].
                            });
                        });
                    });
                }
            });
        }
    });

    usersRoute.get (function (request, response)   // Here we are creating the get call for usersRoute.
    {
        var requestQuery = request.query;   // Here we are creating a vairable called requestQuery.

        var responseStatus200 = response.status (200);   // Here we are creating a vairable called responseStatus200.

        var responseStatus500 = response.status (500);   // Here we are creating a vairable called responseStatus500.

        // Here we are using .find on User.
        User.find (eval ("(" + requestQuery.where + ")")).sort (eval ("(" + requestQuery.sort + ")")).select (eval ("(" + requestQuery.select + ")")).skip (eval ("(" + requestQuery.skip + ")")).limit (eval ("(" + requestQuery.limit + ")")).exec ().then (function (queryResults) 
        {
            // If we are not counting the number of users.
            if (!requestQuery.count) 
            {
                // Here we are returning status code of 200 (OK).
                return responseStatus200.send
                ({
                    // Here is the OK message.
                    message: 'OK: Here Are All The Users.',
                    data: queryResults   // Here we are showing the data, which is queryResults.
                });
            } 
            else  // If we are counting the number of users.
            {
                // Here we are returning status code of 200 (OK).
                return responseStatus200.send
                ({
                    // Here is the OK message.
                    message: 'OK: Here Are The Number Of Users.',  
                    data: queryResults.length   // Here we are showing the data, which is queryResults.length.
                });
            }
        })
        .catch (function (ISE)   // Here we are catching an Internal Server Error.
        {
            // Here we are returning status code of 500 (Internal Server Error).
            return responseStatus500.send
            ({
                // Here is the Internal Server Error message.
                message: 'Internal Server Error: There Has Been A Server Error.',
                data: []   // Here we are showing the data, which is [].
            });
        });
    });
    
    return router;   // Here we are returning the router.
}