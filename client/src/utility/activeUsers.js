import React from 'react'

export function createArrayOfFirstThings(array, number) {
    return array.map((thing) => {
        return thing[number];
    })
}
export function manageActiveUsers() {
    console.log('manageactiveusers')
    let currentCount = this.state.currentlyConnected.filter((guest) => {
        guest[1] -= 1;
        return guest[1] > 0
    })
    console.log(currentCount)
    this.setState({
        currentlyConnected: currentCount
    })
}
export function receivedGuestHeartbeat(parsedData) {
    console.log('recievedguestHeartbeat')
    var currentlyConnected = this.state.currentlyConnected
    var length = (currentlyConnected.length + 1) * 3;
    console.log(currentlyConnected);
    console.log(length);
    let arrayOfFirstThings = this.createArrayOfFirstThings(currentlyConnected, 0)
    if (arrayOfFirstThings.indexOf(parsedData.guest_id) < 0) {
        currentlyConnected.push([parsedData.guest_id, length])
        this.setState({
            currentlyConnected: currentlyConnected
        })
    }
    else {
        currentlyConnected[arrayOfFirstThings.indexOf(parsedData.guest_id)][1] = length
        this.setState({
            currentlyConnected: currentlyConnected
        })
    }
}
export function displayConnected() {
    let numberOfGuests = this.state.currentlyConnected.length

    return (
        <div>
            Guests Connected: {numberOfGuests}
        </div>
    )
}

