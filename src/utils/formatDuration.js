export const formatDuration = (value) => {
    if (value < 10) return <p>0{value}</p>
    return <p>{value}</p>
}