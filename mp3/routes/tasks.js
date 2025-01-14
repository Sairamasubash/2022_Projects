// Here we are requiring the user.js file called User.
var User = require ('../models/user.js');

// Here we are requiring the task.js file called Task.
var Task = require ('../models/task.js');

var defaultAssignedUser = "";   // Here we are creating a variable called defaultAssignedUser.

var defaultAssignedUserName = "unassigned";   // Here we are creating a variable called defaultAssignedUserName.

var zero = 0;   // Here we are creating a variable called zero.

module.exports = function (router)   // Here we are creating a function that exports this module.
{
    var tasksRoute = router.route ('/tasks');   // Here we are creating a variable called tasksRoute.

    tasksRoute.post (function (request, response)    // Here we are creating the post call for tasksRoute.
    {
        var postTask = new Task ();   // Here we are creating a vairable called postTask.
        
        var body = request.body;   // Here we are creating a vairable called body.

        var bodyName = body.name;   // Here we are creating a vairable called bodyName.

        var bodyDescription = body.description;   // Here we are creating a vairable called bodyDescription.

        var bodyDeadline = body.deadline;   // Here we are creating a vairable called bodyDeadline.

        var bodyCompleted = body.completed;   // Here we are creating a vairable called bodyCompleted.

        // If the name field is not defined.
        if (!('name' in body && bodyName !== undefined))
        {
            // Here we are returning status code of 400 (Bad Request).
            return response.status (400).send
            ({
                // Here is the Bad Request message.
                message: 'Bad Request: Please Provide A Name.',
                data: []   // Here we are showing the data, which is [].
            });
        } 
        else   // If the name field is defined.
        {
            postTask.name = bodyName;   // Here we are setting postTask.name equal to bodyName.
        }

        // If the description field is not defined.
        if (!('description' in body && bodyDescription !== undefined)) 
        {
            // Here we are setting postTask.description equal to a clear no description message.
            postTask.description = "There is currently no description for this task.";  
        } 
        else   // If the description field is defined.
        {
            postTask.description = bodyDescription;   // Here we are setting postTask.description equal to bodyDescription.
        }

        // If the deadline field is not defined.
        if (!('deadline' in body && bodyDeadline !== undefined))
        {
            // Here we are returning status code of 400 (Bad Request).
            return response.status (400).send
            ({
                // Here is the Bad Request message.
                message: 'Bad Request: Please Provide A Deadline.',
                data: []   // Here we are showing the data, which is [].
            });
        } 
        else   // If the deadline field is defined.
        {
            postTask.deadline = bodyDeadline;   // Here we are setting postTask.deadline equal to bodyDeadline.
        }

        // If the completed field is not defined.
        if (!('completed' in body && bodyCompleted !== undefined)) 
        {
            postTask.completed = false;   // Here we are setting postTask.completed equal to false.
        } 
        else   // If the completed field is defined.
        {
            postTask.completed = bodyCompleted;  // Here we are setting postTask.completed equal to bodyCompleted.
        }

        // If the assignedUser field is not defined.
        if (!('assignedUser' in request.body && request.body.assignedUser !== undefined && request.body.assignedUser.length > zero)) 
        {
            // Here we are setting postTask.assignedUser equal to defaultAssignedUser.
            postTask.assignedUser = defaultAssignedUser;

            // Here we are setting postTask.assignedUserName equal to defaultAssignedUserName.
            postTask.assignedUserName = defaultAssignedUserName;

            // Here we are using .save on postTask.
            postTask.save ().then (function (queryResults) 
            {
                // Here we are returning status code of 201 (Created).
                return response.status (201).send
                ({
                    // Here is the Created message.
                    message: 'Created: A New Task Has Been Created.',
                    data: queryResults   // Here we are showing the data, which is queryResults.
                });
            })
            .catch (function (ISE)   // Here we are catching an Internal Server Error.
            {
                // Here we are returning status code of 500 (Internal Server Error).
                return response.status (500).send
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
            User.findById (request.body.assignedUser).exec ().then (function (userInformation) 
            {
                // If userInformation does not equal null.
                if (!(userInformation == null))
                {
                    // Here we are setting postTask.assignedUser equal to userInformation.id.
                    postTask.assignedUser = userInformation.id;

                    // Here we are setting postTask.assignedUserName equal to userInformation.name.
                    postTask.assignedUserName = userInformation.name;

                    // Here we are using .save on postTask.
                    postTask.save ().then (function (queryResults) 
                    {
                        // If queryResults.completed is equal to true.
                        if (queryResults.completed) 
                        {
                            // Here we are returning status code of 201 (Created).
                            return response.status (201).send
                            ({
                                // Here is the Created message.
                                message: 'Created: A New Task Has Been Created.',
                                data: queryResults   // Here we are showing the data, which is queryResults.
                            });
                        } 
                        else   // If queryResults.completed is equal to false.
                        {
                            // Here we are using .push on userInformation.pendingTasks.
                            userInformation.pendingTasks.push (queryResults.id);

                            // Here we are using .save on userInformation.
                            userInformation.save ().then (function () 
                            {
                                // Here we are returning status code of 201 (Created).
                                return response.status (201).send
                                ({
                                    // Here is the Created message.
                                    message: 'Created: A New Task Has Been Created.',
                                    data: queryResults   // Here we are showing the data, which is queryResults.
                                });
                            });
                        }
                    })
                    .catch (function (ISE)   // Here we are catching an Internal Server Error.
                    {
                        // Here we are returning status code of 500 (Internal Server Error).
                        return response.status (500).send
                        ({
                            // Here is the Internal Server Error message.
                            message: 'Internal Server Error: There Has Been A Server Error.',
                            data: []   // Here we are showing the data, which is [].
                        });
                    });
                } 
                else   // If userInformation equals null.
                {
                    // Here we are setting postTask.assignedUser equal to defaultAssignedUser.
                    postTask.assignedUser = defaultAssignedUser;

                    // Here we are setting postTask.assignedUserName equal to defaultAssignedUserName.
                    postTask.assignedUserName = defaultAssignedUserName;

                    // Here we are using .save on postTask.
                    postTask.save ().then (function (queryResults) 
                    {
                        // Here we are returning status code of 201 (Created).
                        return response.status (201).send
                        ({
                            // Here is the Created message.
                            message: 'Created: A New Task Has Been Created.',
                            data: queryResults   // Here we are showing the data, which is queryResults.
                        });
                    })
                    .catch (function (ISE)   // Here we are catching an Internal Server Error.
                    {
                        // Here we are returning status code of 500 (Internal Server Error).
                        return response.status (500).send
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

    tasksRoute.get (function (request, response)   // Here we are creating the get call for tasksRoute.
    {
        var requestQuery = request.query;   // Here we are creating a vairable called requestQuery.

        // Here we are using .find on Task.
        Task.find (eval ("(" + requestQuery.where + ")")).sort (eval ("(" + requestQuery.sort + ")")).select (eval ("(" + requestQuery.select + ")")).skip (eval ("(" + requestQuery.skip + ")")).limit (eval ("(" + requestQuery.limit + ")")).exec ().then (function (queryResults) 
        {
            // If we are not counting the number of tasks.
            if (!requestQuery.count) 
            {
                // Here we are returning status code of 200 (OK).
                return response.status (200).send
                ({
                    // Here is the OK message.
                    message: 'OK: Here Are All The Tasks.',
                    data: queryResults   // Here we are showing the data, which is queryResults.
                });
            } 
            else   // If we are counting the number of tasks.
            {
                // Here we are returning status code of 200 (OK).
                return response.status (200).send
                ({
                    // Here is the OK message.
                    message: 'OK: Here Are The Number Of Tasks.',
                    data: queryResults.length   // Here we are showing the data, which is queryResults.length.
                });
            }
        })
        .catch (function (ISE)   // Here we are catching an Internal Server Error.
        {
            // Here we are returning status code of 500 (Internal Server Error).
            return response.status (500).send
            ({
                // Here is the Internal Server Error message.
                message: 'Internal Server Error: There Has Been A Server Error.',
                data: []   // Here we are showing the data, which is [].
            });
        });
    });

    return router;   // Here we are returning the router.
}