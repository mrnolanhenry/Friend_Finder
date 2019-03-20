$(document).ready(function () {

    let questions = ["You enjoy going outside over staying in.", "You prefer dogs to cats.", "You gain energy from social engagements.", "It's more important to enjoy life than achieve one's aspirations.", "You prefer to cook a meal with your partner rather than go out to eat together.", "It is better to embrace your partner's strengths and weaknesses rather than push them to change.", "You stick with a few long-term close friends rather than make a lot of new friends.", "It's easy to look past someone's physical appearance if they have a lot of other great qualities.", "Your partner has to share similar points of view when it comes to politics.", "It's better to speak one's mind immediately rather than bottle it up, even if it may hurt someone's feelings."];

    // let questions = ["You enjoy going outside over staying in.", "You prefer dogs to cats."];

    displayEachQuestion();

    function displayEachQuestion() {
        for (let i in questions) {
            displayQuestion(questions[i], parseInt(i) + 1);
        }
    }

    function displayQuestion(string, questionNum) {
        let questionDiv = $("<div>");
            questionDiv.attr("class","questionDiv");
        let h4 = $("<h4>");
        h4.text("Question " + questionNum)
        questionDiv.append(h4);

        let h6 = $("<h6>");
        h6.text(string);
        questionDiv.append(h6);

        let dropdownDiv = $("<div>");
        dropdownDiv.attr("title", "");
        dropdownDiv.attr("id", "q" + questionNum + "_dropdown");
        let span = $("<span>");
        span.text("Select an Option ");
        dropdownDiv.append(span);
        let select = $("<select>");
        select.attr("class", "selection");
        select.attr("id", "q" + questionNum);
        let option0 = $("<option>");
        option0.attr("value", "");
        select.append(option0);
        for (let i = 1; i < 6; i++) {
            let option = $("<option>");
            option.attr("value", i.toString());
            option.text(option.attr("value"));
            if (i === 1) {
                option.append("--Strongly Disagree");
            }
            else if (i === 5) {
                option.append("--Strongly Agree");
            }
            select.append(option);
        }
        dropdownDiv.append(select);
        questionDiv.append(dropdownDiv);
        questionDiv.append($("<br>"));
        $("#questionsDiv").append(questionDiv);
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();

        // checks if all forms are filled
        function surveyComplete() {
            var surveyComplete = true;
            $(".form-control").each(function () {
                if ($(this).val() === "") {
                    surveyComplete = false;
                }
            });

            $(".selection").each(function () {
                if ($(this).val() === "") {
                    surveyComplete = false;
                }
            });
            return surveyComplete;
        }

        if (surveyComplete()) {
            // Create an object for the user"s data
            var currentUser = {
                name: $("#name").val(),
                photo: $("#photo").val(),
                scores: [
                    $("#q1").val(),
                    $("#q2").val(),
                    $("#q3").val(),
                    $("#q4").val(),
                    $("#q5").val(),
                    $("#q6").val(),
                    $("#q7").val(),
                    $("#q8").val(),
                    $("#q9").val(),
                    $("#q10").val()
                ]
            };

            $.post("/api/friends", currentUser, function (data) {

                // Update the modal with the results from the post operation handled in apiRoutes.js and toggle it on
                $("#results-name").text(data.name);
                $("#results-pic").attr("src", data.photo);
                $("#results-div").modal("toggle");

            });
        } else {
            alert("Please fill out all fields before submitting!");
        }
    });

});