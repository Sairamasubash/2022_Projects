// Here we are requiring the user.js file called User.
var User = require ('../models/user.js');

// Here we are requiring the task.js file called Task.
var Task = require ('../models/task.js');

var empty = {};   // Here we are creating a variable called empty.

var defaultAssignedUser = "";   // Here we are creating a variable called defaultAssignedUser.

var defaultAssignedUserName = "unassigned";   // Here we are creating a variable called defaultAssignedUserName.

var zero = 0;   // Here we are creating a variable called zero.

module.exports = function (router)   // Here we are creating a function that exports this module.
{
    var taskIDRoute = router.route ('/tasks/:id');   // Here we are creating a variable called taskIDRoute.

    taskIDRoute.delete (function (request, response)   // Here we are creating the delete call for taskIDRoute. 
    {
        var requestQuery = request.params.id;   // Here we are creating a vairable called requestQuery.

        var responseStatus200 = response.status (200);   // Here we are creating a vairable called responseStatus200.

        var responseStatus404 = response.status (404);  // Here we are creating a vairable called responseStatus404.

        var responseStatus500 = response.status (500);   // Here we are creating a vairable called responseStatus500.

        // Here we are using .findById on Task.
        Task.findById (requestQuery).exec ().then (function (queryResults) 
        {
            // If queryResults does not equal null.
            if (!(queryResults == null)) 
            {
                // If queryResults.assignedUser equals defaultAssignedUser and queryResults.completed equals true.
                if (!(queryResults.assignedUser != defaultAssignedUser && !queryResults.completed)) 
                {
                    // Here we are using .delete on queryResults.
                    queryResults.delete ().then (function () 
                    {
                        // Here we are returning status code of 200 (OK).
                        return responseStatus200.send
                        ({
                            // Here is the OK message.
                            message: 'OK: The Task With The ID You Have Provided Is Deleted.',
                            data: []   // Here we are showing the data, which is [].
                        });
                    });
                } 
                else   // If queryResults.assignedUser does not equal defaultAssignedUser and queryResults.completed does not equal true.
                {
                    // Here we are using .findById on User.
                    User.findById (queryResults.assignedUser).exec ().then (function (userInformation) 
                    {
                        // If userInformation equals null.
                        if (!(userInformation != null)) 
                        {
                            // Here we are using .delete on queryResults.
                            queryResults.delete ().then (function() 
                            {
                                // Here we are returning status code of 200 (OK).
                                return responseStatus200.send
                                ({
                                    // Here is the OK message.
                                    message: 'OK: The Task With The ID You Have Provided Is Deleted.',
                                    data: []   // Here we are showing the data, which is [].
                                });
                            });
                        } 
                        else   // If userInformation does not equal null.
                        {
                            // Here we are using .remove on userInformation.pendingTasks.
                            userInformation.pendingTasks.remove (queryResults.id);

                            // Here we are using .save on userInformation.
                            userInformation.save ().then (function() 
                            {
                                // Here we are using .delete on queryResults.
                                queryResults.delete ().then (function() 
                                {
                                    // Here we are returning status code of 200 (OK).
                                    return responseStatus200.send
                                    ({
                                        // Here is the OK message.
                                        message: 'OK: The Task With The ID You Have Provided Is Deleted.',
                                        data: []   // Here we are showing the data, which is [].
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
                    message: 'Not Found: There Are No Tasks With The ID You Have Provided.',
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

    taskIDRoute.put (function (request, response)   // Here we are creating the put call for taskIDRoute. 
    {
        var requestQuery = request.params.id;   // Here we are creating a vairable called requestQuery.
        
        var body = request.body;   // Here we are creating a vairable called body.

        var bodyName = body.name;   // Here we are creating a vairable called bodyName.

        var bodyDescription = body.description;   // Here we are creating a vairable called bodyDescription.

        var bodyDeadline = body.deadline;   // Here we are creating a vairable called bodyDeadline.

        var bodyCompleted = body.completed;   // Here we are creating a vairable called bodyCompleted.

        var bodyAssignedUser = body.assignedUser;   // Here we are creating a vairable called bodyAssignedUser.
        
        var responseStatus200 = response.status (200);   // Here we are creating a vairable called responseStatus200.

        var responseStatus400 = response.status (400);   // Here we are creating a vairable called responseStatus400.

        var responseStatus404 = response.status (404);   // Here we are creating a vairable called responseStatus404.

        var responseStatus500 = response.status (500);   // Here we are creating a vairable called responseStatus500.

        // Here we are using .findById on Task.
        Task.findById (requestQuery).exec ().then (function (queryResults) 
        {
            // If queryResults does not equal null.
            if (!(queryResults == null)) 
            {
                // If queryResults.assignedUser does not equal defaultAssignedUser and queryResults.completed equals false.
                if (queryResults.assignedUser != defaultAssignedUser && !queryResults.completed) 
                {
                    // Here we are using .findById on User.
                    User.findById (queryResults.assignedUser).exec ().then (function (userInformation) 
                    {
                        // Here we are using .remove on userInformation.pendingTasks.
                        userInformation.pendingTasks.remove (queryResults.id);

                        // Here we are using .push on [].
                        [].push (userInformation.save ());
                    });
                }

                var allPromise1 = Promise.all ([]);   // Here we are creating a vairable called allPromise1.

                // Here we are using .then on allPromise1.
                allPromise1.then (function () 
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

                    // If the description field is not defined.
                    if (!('description' in body && bodyDescription !== undefined)) 
                    {
                        // Here we are setting empty.description equal to a clear no description message.
                        empty.description = "There is currently no description for this task.";
                    } 
                    else   // If the description field is defined.
                    {
                        empty.description = bodyDescription;   // Here we are setting empty.description equal to bodyDescription.
                    }

                    // If the deadline field is not defined.
                    if (!('deadline' in body && bodyDeadline !== undefined)) 
                    {
                        // Here we are returning status code of 400 (Bad Request).
                        return responseStatus400.send
                        ({
                            // Here is the Bad Request message.
                            message: 'Bad Request: Please Provide A Deadline.',
                            data: []   // Here we are showing the data, which is [].
                        });
                    } 
                    else   // If the deadline field is defined.
                    {
                        empty.deadline = bodyDeadline;   // Here we are setting empty.deadline equal to bodyDeadline.
                    }

                    // If the completed field is not defined.
                    if (!('completed' in body && bodyCompleted !== undefined)) 
                    {
                        empty.completed = false;   // Here we are setting empty.completed equal to false.
                    } 
                    else   // If the completed field is defined. 
                    {
                        empty.completed = bodyCompleted;   // Here we are setting postTask.completed equal to bodyCompleted.
                    }

                    // If the assignedUser field is not defined.
                    if (!('assignedUser' in body && bodyAssignedUser !== undefined && bodyAssignedUser.length > zero)) 
                    {
                        // Here we are setting empty.assignedUser equal to defaultAssignedUser.
                        empty.assignedUser = defaultAssignedUser;

                        // Here we are setting empty.assignedUserName equal to defaultAssignedUserName.
                        empty.assignedUserName = defaultAssignedUserName;

                        // Here we are using .findByIdAndUpdate on Task.
                        Task.findByIdAndUpdate (queryResults.id, empty, {new: true}).then (function (newQueryResults3) 
                        {
                            // Here we are returning status code of 201 (Created).
                            return responseStatus200.send
                            ({
                                // Here is the Created message.
                                message: 'OK: This Task Information Has Been Updated.',
                                data: newQueryResults3   // Here we are showing the data, which is newQueryResults3.
                            });
                        })
                        .catch(function(ISE)   // Here we are catching an Internal Server Error. 
                        {
                            // Here we are returning status code of 500 (Internal Server Error).
                            return responseStatus500.send
                            ({
                                // Here is the Internal Server Error message.
                                message: 'Internal Server Error: There Has Been A Server Error.',
                                data: []   // Here we are showing the data, which is [].
                            });
                        });
                    } 
                    else   // If the assignedUser field is defined.
                    {
                        // Here we are using .findById on User.
                        User.findById (bodyAssignedUser).exec ().then (function (userInformation2) 
                        {
                            // If userInformation2 does not equal null.
                            if (!(userInformation2 == null)) 
                            {
                                // Here we are setting empty.assignedUser equal to userInformation2.id.
                                empty.assignedUser = userInformation2.id;

                                // Here we are setting empty.assignedUserName equal to userInformation2.name.
                                empty.assignedUserName = userInformation2.name;

                                // Here we are using .findByIdAndUpdate on Task.
                                Task.findByIdAndUpdate (queryResults.id, empty, {new: true}).then (function (newQueryResults2) 
                                {
                                    // If newQueryResults2.completed equals true.
                                    if (newQueryResults2.completed) 
                                    {
                                        // Here we are returning status code of 200 (OK).
                                        return responseStatus200.send
                                        ({
                                            // Here is the OK message.
                                            message: 'OK: This User Information Has Been Updated.',
                                            data: newQueryResults2   // Here we are showing the data, which is newQueryResults2.
                                        });
                                    } 
                                    else   // If newQueryResults2.completed does not equal true.
                                    {
                                        // Here we are using .push on userInformation2.pendingTasks.
                                        userInformation2.pendingTasks.push (newQueryResults2.id);

                                        // Here we are using .save on userInformation2.
                                        userInformation2.save ().then (function () 
                                        {
                                            // Here we are returning status code of 200 (OK).
                                            return responseStatus200.send
                                            ({
                                                // Here is the OK message.
                                                message: 'OK: This User Information Has Been Updated.',
                                                data: newQueryResults2   // Here we are showing the data, which is newQueryResults2.
                                            });
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
                            } 
                            else   // If userInformation2 equals null.
                            {
                                // Here we are setting empty.assignedUser equal to defaultAssignedUser.
                                empty.assignedUser = defaultAssignedUser;

                                // Here we are setting empty.assignedUserName equal to defaultAssignedUserName.
                                empty.assignedUserName = defaultAssignedUserName;

                                // Here we are using .findByIdAndUpdate on Task.
                                Task.findByIdAndUpdate (queryResults.id, empty, {new: true}).then (function (newQueryResults) 
                                {
                                    // Here we are returning status code of 200 (OK).
                                    return responseStatus200.send
                                    ({
                                        // Here is the OK message.
                                        message: 'OK: This User Information Has Been Updated.',
                                        data: newQueryResults   // Here we are showing the data, which is newQueryResults.
                                    });
                                })
                                .catch (function(ISE)   // Here we are catching an Internal Server Error. 
                                {
                                    // Here we are returning status code of 500 (Internal Server Error).
                                    return responseStatus500.send
                                    ({
                                        // Here is the Internal Server Error message.
                                        message: 'Internal Server Error: There Has Been A Server Error.',
                                        data: []   // Here we are showing the data, which is [].
                                    });
                                });
                            }
                        });
                    }
                });
            } 
            else   // If queryResults equals null. 
            {
                // Here we are returning status code of 404 (Not Found).
                return responseStatus404.send
                ({
                    // Here is the Not Found message.
                    message: 'Not Found: There Are No Tasks With The ID You Have Provided.',
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

    taskIDRoute.get (function (request, response)   // Here we are creating the get call for taskIDRoute.  
    {
        var requestQuery = request.params.id;   // Here we are creating a vairable called requestQuery.

        var responseStatus200 = response.status (200);   // Here we are creating a vairable called responseStatus200.

        var responseStatus404 = response.status (404);   // Here we are creating a vairable called responseStatus404.

        var responseStatus500 = response.status (500);   // Here we are creating a vairable called responseStatus500.

        // Here we are using .findById on Task.
        Task.findById (requestQuery).exec ().then( function (queryResults) 
        {
            // If queryResults does not equal null.
            if (!(queryResults == null)) 
            {
                // Here we are returning status code of 200 (OK).
                return responseStatus200.send
                ({
                    // Here is the OK message.
                    message: 'OK: The Task With The ID You Have Provided Is Found.',
                    data: queryResults   // Here we are showing the data, which is queryResults.
                });
            } 
            else   // If queryResults equals null. 
            {
                // Here we are returning status code of 404 (Not Found).
                return responseStatus404.send
                ({
                    // Here is the Not Found message.
                    message: 'Not Found: There Are No Tasks With The ID You Have Provided.',
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