# AirSpaceV2

AirSpace is a group response platform that allows group members to provide feedback and answer a host user's questions.
Group members can initiate or join existing sessions via phone, tablet, or computer by going to the AirSpace website and
entering their host's unique passport key. The host can then send surveys and view member responses in real time.

## Differences from Version 1

* An encrypted log-in feature for host users and store their serial-numerical GUIDs in the database
* Improved accuracy of our current Active Guest Users display and functionality on the Host Dashboard
* Ability for guest users to ping the host user for assistance
* Implementing a multiple choice survey type

## Authors

* **Aaron Sosa** - [aarontsosa](https://github.com/aarontsosa)
* **Tim Brady** - [tfb414](https://github.com/tfb414)
* **Sarah Abbey** - [sabbey37](https://github.com/sabbey37)
* **Nat Ventura** - [nat-ventura](https://github.com/nat-ventura)

## Built With

* React.js
* Redux
* Node.js
* Express
* WebSockets
* JavaScript ES6
* jQuery 3.2.1
* HTML5/CSS3

## Development Process
* [1. Concept](#1-concept)
* [2. Initial Planning](#2-initial-planning)
* [3. Database Architecture](#3-database-architecture)
* [4. Challenges and Successes](#4-challenges-and-successes)

### 1. Concept

We developed AirSpace with the intention of creating a multipurpose space where host users could poll other users and send information back and forth instantly.

We'd seen digital audience response systems like this in videogames (like popular party quiz games) and lecture halls (using "clickers"), but not in the form of a portable app that could be easily accessed on mobile, without requiring any kind of extra hardware or software installation.

In this iteration, we're working to further develop for use by teachers and students, to facilitate an open and collaborative classroom environment.

### 2. Initial Planning

[9/26 Goals]
* Create schema
* Add dummy data to our tables
* Re-write queries from Version 1:
      - Add Host
      - Add Client
          - Add `host_client` table
      - Create Survey/Question (referred to as `sq`)
          - Add sq - return id
          - Add question - return id
          - Add options - return id
          - Add linking table
          
Scratch Query Examples

``` javascript
createSurvey(sq_id) => {
  // add question
  // add linking table
}

createQuiz(sq_id) => {
  // add question
  // add options
  // add linking table
}
```

#### Backend Planning/"Delegation" of Backend Roles
Let's say that over the WS, the only thing you're ever passing are `state` or `actions`. To perhaps simplify the way we're doing some things, we manage our data on the backend using Redux, and the objects we send over the WS are objects.

i.e. If someone sends a survey-- it populates on guest's page, host clicks a button, sends a WS to all connected clients. All guests with same ID. It populates their surveys. Now-- how is that populated? The backend sends an action?

If you had an action that's like...
```
surveys = (survey, answer) => {
      switch
            case // sending a web socket... #msg_id ;;; need way to identify what we're calculating with state
            return {
                  // spread previous state
                  // { ws.data }
            }
      // { type: CREATE_SURVEY } // an example action that would get fed to this reducer
      }
```
Since you're just listening for messages, you're filtering off stuff-- objects that you're sending over. We need to design our backend like it's a giant reducer.

We need to identify the message...

Is reducer split into two parts? One with data specifically displayed in UI--- and if we're treating backend like giant reducer, then the other reducer is primarily interested in talking to a database.

The thing about a RESTful API, is you identify what code to run with HTTP verb and path but you don't have that with WebSockets, which makes it more like reducers. Because you then have to inspect the DOCTYPE and switch based on that information.

### 3. Database Architecture

To be fully implemented!

### 4. Challenges and Successes