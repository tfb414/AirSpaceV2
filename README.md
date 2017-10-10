# AirSpaceV2

AirSpace is an audience response platform that allows audience members to provide feedback and answer a host user's questions in real-time. Anyone can initiate a session or join existing sessions via phone, tablet, or computer.

## Differences from Version 1

* An encrypted log-in feature for host users to store their serial-numerical GUIDs in the database
* Improved accuracy of our current Active Guest Users display and functionality on the Host Dashboard
* Implementing a multiple choice quiz type

## Authors

* **Aaron Sosa** - [aarontsosa](https://github.com/aarontsosa)
* **Tim Brady** - [tfb414](https://github.com/tfb414)
* **Sarah Abbey** - [sabbey37](https://github.com/sabbey37)
* **Nat Ventura** - [nat-ventura](https://github.com/nat-ventura)

## Built With

* React.js
* Node.js
* Express
* WebSockets
* JavaScript ES6
* jQuery
* HTML5/CSS3
* Sass

## Development Process
* [1. Concept](#1-concept)
* [2. Initial Planning](#2-initial-planning)
* [3. Database Architecture](#3-database-architecture)
* [4 Backend Structure](#4-backend-structure)
* [5. Frontend: React and CSS](#5-frontend-react-and-css)

### 1. Concept

We developed AirSpace with the intention of creating a multipurpose space where host users could poll an audience, sending information back and forth instantly.

We had seen digital audience response systems like this in videogames (such as Jackbox.tv) and lecture halls (using "clickers"), but not in the form of an easily accessible mobile app that wouldn't require extra hardware software installation.

In this second iteration of AirSpace, we're specifically developing for use by teachers and students in order to facilitate an open and collaborative classroom environment.

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

### 3. Database Architecture

Our database contained five primary tables:
* host
* guest
* question
* options
* sq (survey/quiz)

And three linking tables:
* host\_guest
* guest\_question\_response
* sq\_question\_option

### 4. Backend Structure

### 5. Frontend: React and SCSS
