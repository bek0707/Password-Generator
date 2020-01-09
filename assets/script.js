function verifyPasswordLength(verifyLength, minLength, maxLength) {
    // Verifies the chosen password length and returns True/False when:
    //      FALSE: verifyLength is not a number OR is not between the min and max
    //      TRUE: The entered data is a number AND is between the min/max values (inclusive)

    if (isNaN(verifyLength)) {
        return false;
    }
    else if (verifyLength < minLength || verifyLength > maxLength) {
        return false;
    }
    else {
        return true;
    }
}

function showPassword(showText) {
    var showPasswordEl = document.getElementById("displayPassword");
    showPasswordEl.value = showText;
    enableCopyBtn();
}

function enableCopyBtn() {
    // once the new password is written to the screen, enable the Copy To Clipboard button
    var arrButtons = document.querySelectorAll("button");
    arrButtons[1].className = "btn btn-danger btn-rounded enabled";
}

function copyToClip() {
    var copyText = document.getElementById("displayPassword");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
}

function generatePassword() {

    // password minimum length:
    var passwordMinLength = 8;
    // password maximum length:
    var passwordMaxLength = 128;
    // Uppercase letters A-Z:
    var setofUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Lowercase letters a-z:
    var setofLowerCase = setofUpperCase.toLowerCase();
    // Digit 0-9:
    var setofDigits = "0123456789";
    // Accepted special characters: 
    // Note that the first character is a [space] and the last is an appended double quote (")
    var setofSpecialChars = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"';
    var newPassword = "";

    // Get user input:

    // Have user choose desired password length:
    var invalidLength = true;
    var chosenLength = 0;
    while (invalidLength) {
        chosenLength = prompt("How long should your password be (8-128 characters)?");
        invalidLength = !verifyPasswordLength(chosenLength, passwordMinLength, passwordMaxLength);
        if (invalidLength) {
            alert("ERROR: Enter a number between 8 and 128 (inclusive). Click OK to try again.");
        }
    }

    // Have user choose desired character sets to include in the password:
    // Loop through until the user selects at least one set.
    var invalidCharSet = true;
    while (invalidCharSet) {
        var useUpperCase = confirm("Click OK to include uppercase letters [A-Z].");
        var useLowerCase = confirm("Click OK to include lowercase letters [a-z].");
        var useDigits = confirm("Click OK to use numbers [0-9].");
        var useSpecialChar = confirm("Click OK to use special characters.");
        invalidCharSet = !(useUpperCase || useLowerCase || useDigits || useSpecialChar);
        if (invalidCharSet) {
            alert("ERROR: You must use at least one character set. Click OK to select again.");
        }
    }

    // Generate the new password based on the user's selected criteria:
    // Create a var with the full set of chars chosen by the user:
    var desiredCharSet = "";
    if (useUpperCase) { desiredCharSet = desiredCharSet + setofUpperCase };
    if (useLowerCase) { desiredCharSet = desiredCharSet + setofLowerCase };
    if (useDigits) { desiredCharSet = desiredCharSet + setofDigits };
    if (useSpecialChar) { desiredCharSet = desiredCharSet + setofSpecialChars };

    // Create the new password:
    // Pick a random char from the set of chosen char groups, repeating as many times as the selected password length, appending each chosen char.
    newPassword = "";
    var pickRandomChar = 0;
    for (var i = 0; i < chosenLength; i++) {
        pickRandomChar = Math.floor(Math.random() * (desiredCharSet.length));
        newPassword = newPassword + desiredCharSet[pickRandomChar];
    }

    alert("Your new password is: " + newPassword);
    showPassword(newPassword);
    return;
}