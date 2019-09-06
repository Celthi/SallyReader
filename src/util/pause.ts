// time: miliseconds
// usage: await pause(1) // pause one seconds
const pause =(time: number) => {
    return  new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    })
}

export {
    pause,
}