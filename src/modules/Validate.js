// This module contains multiple validators for data entry forms

// Validate data for new and edited tasks
export function Validate(object, activities) {
    
    // 1. Check that a task is selected
    if (activities.length === 0) {
        return "Please select at least one Activity"
    }

    // 2. Check that date is filled out
    if (object.date === "") {
        return "Please include the Date"
    }

    // 3. If "Mow" is included, check that additional data is provided
    if (activities.includes(1)) {
        if (object.length === "" || object.direction === "") {
            return "Please include mow length and direction"
        }
    }

    // 4. If "Water" is included, check that additional data is provided
    if (activities.includes(3) && object.water === "") {
        return "Please include the water amount"
    }

    // Return an empty string to complete validation
    return ""

}

// Verification of data from Login
export function VerifyUser(loginUser, existingUsers) {
    
    // 1. Verify that all signin fields are complete; return an error if not
    if (Object.values(loginUser).some(field => field === null || field === '' || field === undefined) ||
    Object.keys(loginUser).length !== 2) {
        return "Please provide your registered email address and password"
    }

    // 2. See if user data is correct in database, and return the user if present
    let verified = existingUsers.find(user => user.email === loginUser.email && user.password === loginUser.password)
    console.log(verified)
    
    return verified
    
}

// Verification of data from Registration1
export function VerifyReg1(newUser, existingUsers) {

    // 1. Verify that all signin fields are complete; return an error if not
    if (Object.values(newUser).some(field => field === null || field === '' || field === undefined) ||
        Object.keys(newUser).length !== 4) {
        return "Please fill out all four fields"
    }

    // 2. See if user email is already in database
    if (existingUsers.some(user => user.email === newUser.newEmail)) {
        return "That email address is already registered"
    }
    
    // 3. Verify that both passwords match
    if (newUser.newPassword !== newUser.confirm) {
        return "Passwords do not match"
    }
    
    // Return empty string if all tests pass
    return ""

}

// Verification of data from Registration2
export function VerifyReg2(newUser) {

    // 1. Verify that all fields are complete. If not, return an error.
    if (!newUser.address || !newUser.city || !newUser.state || !newUser.zip) {
        return "Please fill out all four fields"
    }

    // 2. Verify proper zip
    const zipRegex = /^\d{5}$/
    console.log(zipRegex.test(newUser.zip))
    if (!zipRegex.test(newUser.zip)) {
        return "Please enter a valid 5-digit zip code"
    }

    // If all tests pass, return an empty string
    return ""

}
// Verification of data from Registration4
export function VerifyReg4(newUser) {
    // Make sure the lawn size is a number
    const lotSizeRegex = /^\d+$/
    if (!lotSizeRegex.test(newUser.lotSize)) {
        return "Please enter a number"
    } else {
        return ""
    }
}