const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
    return sleep(500) // simulate server latency
        .then(() => {
            if (['john@smith.com', 'girl@girl.com'].includes(values.email)) {
                throw { email: 'THIS EMAIL IS TAKEN' }
            }
        })
}

export default asyncValidate