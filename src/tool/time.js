module.exports = {

    async delay(ms) {
        await (ms => new Promise(res => setTimeout(res, ms)))(ms)
    }

};