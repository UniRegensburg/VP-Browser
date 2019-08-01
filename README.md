# VP-Browser

### Background

I'm Lucas Haberl and this is part of my bachelor thesis. My goal was to create a system, which enables other computer science students to participate in experiments more easily by developing a platform, that shows them all current (and past) experiments with the ability to search for specific terms or apply filters to their meta data all together. So i developed a prototype, which is simulating how the participant's way to experiment participation could be enhanced by better usability and a cohesive system.

## Features

### Data persitence through database

This project uses a Firebase Firestore database from Google to save the data created by a user. This data includes the user's settings and which experiments he registered for. The database also holds all experiments and returns them to the webside on loading. It is also automatically updated by changes made by users within the platform.

### Filter and search funcionality

On of my biggest gripes with the current system employed by our faculty is that the experiments in the forum are barely searchable. So i employed the help of List.js for the search funcionality and show the experiments on the side and created a filter system using checkboxes and a self made accordion style "see more" button. The experiments are searchable for any term in them and the filters access meta data like their course, category, date or how many points they give.

### Registration

In this prototype the users use a simulated account. This account can still register for sessions of certains experiments though to show, what could be done with such a platform. De-registering is of course also possible.

## Screenshots

### Startpage
Startpage with next experiment session

![start](https://github.com/UniRegensburg/VP-Browser/blob/master/src/assets/vp_home.PNG?raw=true)

### Experiment list
List of all experiments with filter funcionality

![experiment list](https://github.com/UniRegensburg/VP-Browser/blob/master/src/assets/vp_vl.PNG?raw=true)

### Experiment detail
Experiment specific page with more data

![experiment detail](https://github.com/UniRegensburg/VP-Browser/blob/master/src/assets/vp_vd.PNG?raw=true)

### Experiment sessions
Experiment specific page with more sessions and registration

![experiment sessions](https://github.com/UniRegensburg/VP-Browser/blob/master/src/assets/vp_sessions.PNG?raw=true)

### My experiments
Experiment the user registered for

![experiment sessions](https://github.com/UniRegensburg/VP-Browser/blob/master/src/assets/vp_mv.PNG?raw=true)

### Profil
Profil with user settings

![experiment sessions](https://github.com/UniRegensburg/VP-Browser/blob/master/src/assets/vp_profil.PNG?raw=true)


## How To Use

``` bash
# Project setup
npm install

# Compiles and hot reload at localhost:8080
npm run serve
```

### License
[MIT](https://opensource.org/licenses/MIT)