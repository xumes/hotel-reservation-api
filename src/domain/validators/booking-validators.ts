export function compareDates(firstDate: string, secondDate: string): boolean {
    try {
        const start = new Date(firstDate)
        const end = new Date(secondDate)

        return start < end
    } catch (e) {
        return false
    }
}