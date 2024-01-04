export const formattedDateTime = (date: string | undefined) => {
    if (date) {
        return `${new Date(date).toLocaleDateString()} - ${new Date(date).toLocaleTimeString()}`;
    }
}