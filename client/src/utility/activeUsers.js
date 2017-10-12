import React from 'react'



export function createArrayOfFirstThings(array, number) {
    return array.map((thing) => {
        return thing[number];
    })
}

export function manageActiveUsers() {
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
    var currentlyConnected = this.state.currentlyConnected
    let arrayOfFirstThings = this.createArrayOfFirstThings(currentlyConnected, 0)
    if (arrayOfFirstThings.indexOf(parsedData.guest_id) < 0) {
        currentlyConnected.push([parsedData.guest_id, 3])
        this.setState({
            currentlyConnected: currentlyConnected
        })
    }
    else {
        currentlyConnected[arrayOfFirstThings.indexOf(parsedData.guest_id)][1] = 3
        this.setState({
            currentlyConnected: currentlyConnected
        })
    }
}

export function displayConnected() {
    let numberOfGuests = () => {
        if (this.state.currentlyConnected) {
            return 0;
        }
        else return this.state.currentlyConnected;
    }
    console.log(numberOfGuests());
    // return (
    //     <div>
    //         Guests Connected: {numberOfGuests()}
    //     </div>
    // )
}

export function multiply() {
    this.setState({
        statement: 'THIS IS A THING'
    }, console.log(this.state.statement))
}
