// Converts UNIX times to yyyy-dd-mm
 export function convertDate(dateNum) {

        const UTCOffset = new Date(dateNum).getTimezoneOffset()
        // If this app were to ever go international, the next line would need to be refactored for + or - UTC
        const offsetDate = new Date(dateNum - (UTCOffset * 60 * 1000))
        return offsetDate.toISOString().substring(0, 10)

    }