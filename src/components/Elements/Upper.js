const Upper = (text) => {
    let first = text.charAt(0).toUpperCase();
    return (first+text.slice(1))
}
export default Upper;