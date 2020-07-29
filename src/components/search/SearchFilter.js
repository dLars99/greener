export function BuildSearchArray(filterArray, evt) {

    const checkedActivity = evt.target.value
    console.log(checkedActivity)
    
    if (evt.target.checked) {
        // If the box was checked, add activity to the array in state
        filterArray.push(parseInt(checkedActivity))
    } else {
        // If the box was unchecked, remove the activity from the array in state
        const index = filterArray.indexOf(parseInt(checkedActivity))
        if (index > -1) {
            filterArray.splice(index, 1)
        }
    }

    return filterArray
}

export function filterByActivity(entries, activities) {
    const filteredArray = (activities.length === 0) ? entries
    : entries.filter(entry => entry.activities.some(activity => activities.includes(activity.id)))
    return filteredArray
}