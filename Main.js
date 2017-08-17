import React, { Component } from 'react-native';
import { Provider } from 'react-redux';

import GameContainer from './containers/GameContainer'

import {vw, vh, vmin, vmax , heightOfPipeUp , 
       heightOfPipeDown ,  heightOfGround , heightOfInvisibleArea ,
       positionOfPipeDown     } from './services/viewport';

import configureStore from './store/configureStore'

const initialState = {
    game: {
        gravity: 0.0001,
        objects: [
            {
                name: 'bird',
                position: {
                    x: 46,
                    y: 55
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                dimension: {
                    width: 10,
                    height: 8
                },
                rigid: true,
                static: false,
                invisible : false
            },
            {
                name: 'PipeUp',
                position: {
                    x: 110,
                    y: 0
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfPipeUp
                },
                rigid: true,
                static: true,
                invisible : false
            },
            {
                name: 'PipeDown',
                position: {
                    x: 110,
                    y: positionOfPipeDown
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfPipeDown
                },
                rigid: true,
                static: true,
                invisible : false
            },
            {
                name: 'Invisible',
                position: {
                    x: 110,
                    y: heightOfPipeUp
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfInvisibleArea
                },
                rigid: true,
                static: true,
                invisible : true
            },
            {
                name: 'PipeUp',
                position: {
                    x: 150,
                    y: 0
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfPipeUp
                },
                rigid: true,
                static: true,
                invisible : false
            },
            {
                name: 'PipeDown',
                position: {
                    x: 150,
                    y: positionOfPipeDown
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfPipeDown
                },
                rigid: true,
                static: true,
                invisible : false
            },
            {
                name: 'Invisible',
                position: {
                    x: 150,
                    y: heightOfPipeUp
                },
                velocity: {
                    x: -0.9,
                    y: 0
                },
                dimension: {
                    width: 15,
                    height: heightOfInvisibleArea
                },
                rigid: true,
                static: true,
                invisible : true
            },
            
            {
                name : "Ground",
                position : {
                    x : 0,
                    y : 80
                },
                velocity : {
                    x : -1,
                    y : 0
                },
                dimension : {
                    width :  100,
                    height : heightOfGround
                },
                rigid : false,
                static: true,
                invisible : true 
            },
             {
                name : "Ground",
                position : {
                    x : 100,
                    y : 80
                },
                velocity : {
                    x :  -1,
                    y : 0
                },
                dimension : {
                    width :  100,
                    height : heightOfGround
                },
                rigid : false,
                static: true,
                invisible : true 
            }
        ],
        score: 0,
        gameOver : false,
        collidedArray : [],
        start : false
    }
}



let store = configureStore(initialState);


const Main = () => {
  return (
    <Provider store={store}>
      <GameContainer  />
    </Provider>
  )
}

export default Main

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');

// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds
        game.load.image('bird', 'assets/bird.png'); 
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.
        game.stage.backgroundColor = '#71c5cf'; 

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;  

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);  
    },

    update: function() {
        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();
    },

        // Make the bird jump 
    jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
},

// Restart the game
    restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
},

};



