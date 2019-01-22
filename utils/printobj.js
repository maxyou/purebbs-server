module.exports = function (obj) {

    var propValue
    for (var propName in obj) {
        propValue = obj[propName]
        console.log('>>>>>propName:',propName)
        console.log('>>>>>propValue:',propValue)
    }
}

