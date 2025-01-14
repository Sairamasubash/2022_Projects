// Here we are requiring the user.js file called User.
var User = require ('../models/user.js');

// Here we are requiring the task.js file called Task.
var Task = require ('../models/task.js');

var empty = {};   // Here we are creating a variable called empty.

var defaultAssignedUser = "";   // Here we are creating a variable called defaultAssignedUser.

var defaultAssignedUserName = "unassigned";   // Here we are creating a variable called defaultAssignedUserName.

var allPromise1 = Promise.all ([]);   // Here we are creating a vairable called allPromise1.

var allPromise2 = Promise.all ([]);   // Here we are creating a vairable called allPromise2.

var allPromise3 = Promise.all ([]);   // Here we are creating a vairable called allPromise3.

var allPromise4 = Promise.all ([]);   // Here we are creating a vairable called allPromise4.

module.exports = function (router)   // Here we are creating a function that exports this module.
{
    var userIDRoute = router.route ('/users/:id');   // Here we are creating a variable called userIDRoute.

    userIDRoute.delete (function (request, response)   // Here we are creating the delete call for userIDRoute.
    {
        var requestQuery = request.params.id;   // Here we are creating a vairable called requestQuery.

        var responseStatus200 = response.status (200);   // Here we are creating a vairable called responseStatus200.

        var responseStatus404 = response.status (404);   // Here we are creating a vairable called responseStatus404.

        var responseStatus500 = response.status (500);   // Here we are creating a vairable called responseStatus500.

        // Here we are using .findById on User.
        User.findById (requestQuery).exec ().then (function (queryResults) 
        {
            // If queryResults does not equal null.
            if (!(queryResults == null)) 
            {
                // Here we are using .updateMany on Task.
                Task.updateMany ({assignedUser: queryResults.id}, {assignedUser: defaultAssignedUser, assignedUserName: defaultAssignedUserName}).then (function () 
                {
                    // Here we are using .delete on queryResults.
                    queryResults.delete ().then (function () 
                    {
                        // Here we are returning status code of 200 (OK).
                        return responseStatus200.send
                        ({
                            // Here is the OK message.
                            message: 'OK: The User With The ID You Have Provided Is Deleted.',
                            data: []   // Here we are showing the data, which is [].
                        });
                    });
                });
            } 
            else   // If queryResults equals null.
            {
                // Here we are returning status code of 404 (Not Found).
                return responseStatus404.send
                ({
                    // Here is the Not Found message.
                    message: 'Not Found: There Are No Users With The ID You Have Provided.',
                    data: []   // Here we are showing the data, which is [].
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

    userIDRoute.put (function (request, response)   // Here we are creating the put call for userIDRoute.
    {
        var requestQuery = request.params.id;   // Here we are creating a vairable called requestQuery.

        var body = request.body;   // Here we are creating a vairable called body.

        var bodyName = body.name;   // Here we are creating a vairable called bodyName.

        var bodyEmail = body.email;   // Here we are creating a vairable called bodyEmail.

        var bodyPendingTasks = body.pendingTasks;   // Here we are creating a vairable called bodyPendingTasks.

        var responseStatus200 = response.status (200);   // Here we are creating a vairable called responseStatus200.

        var responseStatus400 = response.status (400);   // Here we are creating a vairable called responseStatus400.

        var responseStatus404 = response.status (404);   // Here we are creating a vairable called responseStatus404.

        var responseStatus500 = response.status (500);   // Here we are creating a vairable called responseStatus500.

        // Here we are using .findById on User.
        User.findById (requestQuery).exec ().then (function (queryResults) 
        {
            // If queryResults does not equal null.
            if (!(queryResults == null)) 
            {
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
                    empty.name = bodyName;   // Here we are setting empty.name equal to bodyName.
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
                        // If checkForEmail does not equal null or if checkForEmail.id does not equal queryResults.id.
                        if (!(checkForEmail == null || checkForEmail.id == queryResults.id)) 
                        {
                            // Here we are returning status code of 400 (Bad Request).
                            return responseStatus400.send
                            ({
                                // Here is the Bad Request message.
                                message: 'Bad Request: You Have Already Used This Email, Please Provide A Different Email.',
                                data: []   // Here we are showing the data, which is [].
                            });
                        } 
                        else   // If checkForEmail equals null or if checkForEmail.id equals queryResults.id.
                        {
                            empty.email = bodyEmail;   // Here we are setting empty.email equal to bodyEmail.

                            // Here we are using .updateMany on Task.
                            Task.updateMany ({assignedUser: queryResults.id}, {assignedUser: defaultAssignedUser, assignedUserName: defaultAssignedUserName}).then (function () 
                            {
                                // If the pendingTasks field is defined.
                                if ('pendingTasks' in body && bodyPendingTasks !== undefined) 
                                {
                                    // Here we are using .forEach on bodyPendingTasks.
                                    bodyPendingTasks.forEach (function (id) 
                                    {
                                        // Here we are using .push on [].
                                        [].push (Task.findById (id).exec ());
                                    });
                                }

                                // Here we are using .then on allPromise1.
                                allPromise1.then (function (moreUsers) 
                                {
                                    // Here we are using .forEach on moreUsers.
                                    moreUsers.forEach (function (taskInformation) 
                                    {
                                        // If taskInformation does not equal null.
                                        if (taskInformation != null) 
                                        {
                                            // Here we are using .push on [].
                                            [].push (taskInformation.id);
                                        }
                                    });

                                    // Here we are using .findByIdAndUpdate on User.
                                    User.findByIdAndUpdate (queryResults.id, empty, {new: true}).then (function (newQueryResults) 
                                    {
                                        // Here we are using .forEach on newQueryResults.pendingTasks.
                                        newQueryResults.pendingTasks.forEach (function (id) 
                                        {
                                            // Here we are using .push on [].
                                            [].push (Task.findById (id).exec ());
                                        });

                                        // Here we are using .then on allPromise2.
                                        allPromise2.then (function (moreTasks) 
                                        {
                                            // Here we are using .forEach on moreTasks.
                                            moreTasks.forEach (function (taskInformation2) 
                                            {
                                                // If taskInformation2.assignedUser does not equal defaultAssignedUser.
                                                if (taskInformation2.assignedUser !== defaultAssignedUser) 
                                                {
                                                    // Here we are using .push on [].
                                                    [].push (User.findById (taskInformation2.assignedUser).exec ());
                                                }

                                                // Here we are using .then on allPromise3.
                                                allPromise3.then (function (moreUsers2) 
                                                {
                                                    // Here we are using .forEach on moreUsers2.
                                                    moreUsers2.forEach (function (userInformation) 
                                                    {
                                                        // Here we are using .remove on userInformation.pendingTasks.
                                                        userInformation.pendingTasks.remove (taskInformation2.id);

                                                        // Here we are using .push on [].
                                                        [].push (userInformation.save ());
                                                    });
                                                });

                                                // Here we are setting taskInformation2.completed equal to false.
                                                taskInformation2.completed = false;

                                                // Here we are setting taskInformation2.assignedUser equal to newQueryResults.id.
                                                taskInformation2.assignedUser = newQueryResults.id;

                                                // Here we are setting taskInformation2.assignedUserName equal to newQueryResults.name.
                                                taskInformation2.assignedUserName = newQueryResults.name;

                                                // Here we are using .push on [].
                                                [].push (taskInformation2.save ());
                                            });

                                            // Here we are using .then on allPromise4.
                                            allPromise4.then (function () 
                                            {
                                                // Here we are returning status code of 200 (OK).
                                                return responseStatus200.send
                                                ({
                                                    // Here is the OK message.
                                                    message: 'OK: This User Information Has Been Updated.',
                                                    data: newQueryResults   // Here we are showing the data, which is newQueryResults.
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
                                            message: 'Internal Server Error: There Has Been A Server Error.',
                                            data: []   // Here we are showing the data, which is [].
                                        });
                                    });
                                });

                            });
                        }
                    });
                }
            } 
            else   // If queryResults equals null.
            {
                // Here we are returning status code of 404 (Not Found).
                return responseStatus404.send
                ({
                    // Here is the Not Found message.
                    message: 'Not Found: There Are No Users With The ID You Have Provided.',
                    data: []   // Here we are showing the data, which is [].
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

    userIDRoute.get (function (request, response)   // Here we are creating the get call for userIDRoute.
    {
        var requestQuery = request.params.id;   // Here we are creating a vairable called requestQuery.

        var responseStatus200 = response.status (200);   // Here we are creating a vairable called responseStatus200.

        var responseStatus404 = response.status (404);   // Here we are creating a vairable called responseStatus404.

        var responseStatus500 = response.status (500);   // Here we are creating a vairable called responseStatus500.

        // Here we are using .findById on User.
        User.findById (requestQuery).exec ().then( function (queryResults) 
        {
            // If queryResults does not equal null.
            if (!(queryResults == null)) 
            {
                // Here we are returning status code of 200 (OK).
                return responseStatus200.send
                ({
                    // Here is the OK message.
                    message: 'OK: The User With The ID You Have Provided Is Found.',
                    data: queryResults   // Here we are showing the data, which is queryResults.
                });
            } 
            else   // If queryResults equals null.
            {
                // Here we are returning status code of 404 (Not Found).
                return responseStatus404.send
                ({
                    // Here is the Not Found message.
                    message: 'Not Found: There Are No Users With The ID You Have Provided.',
                    data: []   // Here we are showing the data, which is [].
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