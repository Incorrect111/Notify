export default function loadMore(res) {
    const messages = [];

    console.log(res)
    console.log(res.length)
        // > 2
    if (res.length > 4) {
        for (let i = 0; i < 4; i++) {
            // main - false to main - true
            res[i].main = true
            messages.push(res[i])
        } //back messages
        return messages
    }
    //  < 2
    else {
        for (let i = 0; i < res.length; i++) {
            res[i].main = true
            messages.push(res[i])
        } //back messages
        return messages
    }
}