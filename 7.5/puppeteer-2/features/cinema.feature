Feature: Tests for tickets

    Feature Description
    Scenario: Book available ticket
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose date
        When user choose time of a movie
        When user choose a sit
        When user click on the booking button
        When user click on the button to get booking code 
        Then user get the code and text "Электронный билет"

    Scenario: Book some available tickets
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose date
        When user choose time of a movie
        When user choose a first sit
        When user choose a second sit
        When user click on the booking button
        When user click on the button to get booking code 
        Then user get the code and text "Электронный билет"

    Scenario: Book unavailable ticket, but unsuccessfully
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose date that has been choosen earlier
        When user choose time of a movie that has been choosen earlier
        When user choose a sit that has been choosen earlier
        When user click on the booking button
        Then button for booking is inactive "true"