import { formatDate } from "./formatDate.js"

export const logger = (string) => {
    console.log(formatDate(new Date()) + ' -- ' + string)
}
