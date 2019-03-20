// 4. Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

let friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        let newFriend = req.body;
        newFriend.scores = convertToInt(newFriend.scores);

        let closestFriend = friends[indexOfMin(newFriend)];

        friends.push(newFriend);
        res.json(closestFriend);

        // convert scores key from strings to numbers
        function convertToInt(array) {
            let newScores = [];
            for (let string in array) {
                newScores.push(parseInt(array[string]));
            }
            return newScores;
        };

        // sum up the total delta between 2 scores keys
        function sumDelta(newArray, prevArray) {
            let sum = 0;
            for (let i in newArray) {
                sum += Math.abs(newArray[i] - prevArray[i])
            }
            return sum;
        }

        // sum up the delta of each previous friends' scores compared to the current
        // stores this in an array that is in the same order as friends variable
        function sumEachDelta(friend) {
            let sumArray = [];
            for (let i in friends) {
                let sum = sumDelta(friend.scores,friends[i].scores);
                sumArray.push(sum);
            }
            return sumArray;
        }

        // get the index of the lowest score in the array that sumEachDelta returns
        function indexOfMin(friend) {
            let sumArray = sumEachDelta(friend);
            var min = sumArray[0];
            var minIndex = 0;
        
            for (let i in sumArray) {
                // if there is a perfect match, stop looping through each friend's deltas immediately and return the current index
                if (sumArray[i] === 0) {
                    return i;
                }
                // Otherwise keep looping through each friend's deltas
                else if (sumArray[i] < min) {
                    minIndex = i;
                    min = sumArray[i];
                }
            }
            return minIndex;
        }
    });
};
