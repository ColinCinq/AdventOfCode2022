$(document).ready(function () {
    var words = ["Calorie Counting", "Rock Paper Scissors", "Rucksack Reorganization", "Camp Cleanup", "aaaaaa", "aaaaaa", "aaaaaa", "aaaaaa", "aaaaaa", "aaaaaa", "aaaaaa"];

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var timeDelay = 200;

    //   day = 26; // uncomment to skip to 25

    // Only work in December
    if (month === 12) {
        // Loop through each calendar window
        $("li").each(function (index) {
            var adventwindow = index + 1;
            var item = $(this);

            // Open past windows
            if (day !== adventwindow && adventwindow < day) {
                window.setTimeout(function () {
                    item.children(".door").addClass("open");
                }, timeDelay);
            }

            // timeout offset for past window opening animation
            timeDelay += 100;

            // Add words so far to message variable
            if (adventwindow <= day) {
                var word = words[index];
                $(this).append(
                    '<div class="revealed"> <a href="/day' +
                    adventwindow +
                    '">' +
                    word +
                    "</a> </div>"
                );
            }

            // Add jiggle animation to current day window
            if (adventwindow === day) {
                $(this).addClass("current");
                $(this).addClass("jiggle");
            }

            // On clicking a window, toggle it open/closed and
            // handle other things such as removing jiggle and 25th
            $(this).on("click", function () {
                if (adventwindow <= day) {
                    $(this).children(".door").toggleClass("open");
                }

                $(this).removeClass("jiggle");
            });
        });
    }
});
