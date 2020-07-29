export function Validate(object, activities) {
    let error = ""
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