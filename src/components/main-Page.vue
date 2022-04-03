<template>
<div class='container'>
    <h1> <b>Simons says </b> </h1>
    <div class='gamePlay'>
        <ul @click='experiencedPlayer'>
         <li class='red' ref='red' title='1' value='0'></li>
         <li class='blue' ref='blue' title='2' value='26'></li>
         <li class='yellow' ref='yellow' title='3' value='51'></li>
         <li class='green' ref='green' title='4' value= '76'></li>
        </ul>
    </div>
    <div class='game-info'>
        <h2>
            Round:
            <span > {{count}} </span>
        </h2>
        <button data-action='start' @click='startGame'> Start </button>
        <p class='lose' ref='lose'> You died </p> 
    </div>
    <div class='game-options'>
        <h2> Game options </h2>
            <input type='radio' name='mode' value='1.5' @click='setTime'> 
            <span class='radio-text' > Easy </span><br/>
            <input type='radio' name='mode' value='1.0' @click='setTime' checked> 
            <span class='radio-text'> Normal </span> <br>
            <input type='radio' name='mode' value='0.4' @click='setTime'> 
            <span class='radio-text'> Hard </span> <br>
            <input type='radio' name='sound' value='sound_off' @click='soundPlay=!soundPlay'> 
            <span class='radio-text'> Sound off </span> <br>
    </div>
    
</div>
</template>

<script>
import sound1 from "../assets/1.mp3"
import sound2 from "../assets/2.mp3"
import sound3 from "../assets/3.mp3"
import sound4 from "../assets/4.mp3"
export default {
    name: 'mainPage',
    data () {
        return {
            speed: '',
            soundPlay: true,
            domElement: '',
            time: 1000,
            count: 0,
            arr: [],
            i: 0,
        }
    },
    
    methods: {
        playSound(sound) {
            if(this.soundPlay) {
                new Audio(sound).play();
            }    
        },
        setTime(event) {
            console.log(event.target.value);
            let time = Number(event.target.value);
            console.log(time);
            this.time = time * 1000;
        },
        startGame() {
            this.count = 0;
            this.arr = [];
            this.i = 0;
            this.$refs.lose.style.visibility = 'hidden';
            this.playGame();
        },
        playGame() {
            //let myAudio = new Audio('../assets/1.mp3');
            //myAudio.play();   
            this.count += 1;
            for(let i = 0; i < this.count - this.arr.length; i++) {
                let number = Math.trunc(Math.random() * 100);
                this.arr.push(number);
            }
            let position = 0;
            setTimeout(this.highlightItem, this.time, this.arr, position);

        },
        highlightItem(array, position) {
            if(position >= array.length) return;
            let ref;
            if(array[position] <= 25) {
                ref = this.$refs.red;
                this.$refs.red.style.opacity = 1;
                this.playSound(sound1);
                
            } else if(array[position] > 25 && array[position] <= 50) {
                ref = this.$refs.blue;
                this.$refs.blue.style.opacity = 1;
                this.playSound(sound2);
                
            } else if(array[position] > 50 && array[position] <= 75) {
                ref = this.$refs.yellow;
                this.$refs.yellow.style.opacity = 1
                this.playSound(sound3);
            } else { 
                ref = this.$refs.green;
                this.$refs.green.style.opacity = 1 
                this.playSound(sound4);
            }
            position++;
            setTimeout(this.removeHighlight, this.time, array, position, ref);
        },

        removeHighlight(array, position, ref) {
            console.log(position)
            ref.style.opacity = 0.6;
            setTimeout(this.highlightItem, this.time, array, position);
        },

        experiencedPlayer(event) {
            event.target.style.opacity = 1
            setTimeout( () => event.target.style.opacity = 0.6, 200 );
            switch(event.target.title) {
                case '1':
                    this.playSound(sound1);
                    break;
                case '2':
                    this.playSound(sound2);
                    break
                case '3':
                    this.playSound(sound3);
                    break;
                case '4':
                    this.playSound(sound4);
                    break;
            }
            if(event.target.value > this.arr[this.i] || this.arr[this.i] - 25 >= event.target.value) {
                this.$refs.lose.style.visibility = 'visible';
                this.count = 0;
                this.i = 0;
                this.arr = [];
            } else { this.i++}
            if(this.i == this.arr.length && this.arr.length != 0) {
                console.log(this.i);
                console.log(this.arr.length)
                this.i = 0;
                this.playGame();
            }   
        },
    }
}
</script>

<style lang='sass' scoped>
.container
    width: 540px
    margin: 0 auto

.gamePlay
    background: #fff
    position: relative
    float: left
    margin-right: 3em
    width: 302px
    height: 295px
    border-radius: 150px
    box-shadow: 2px 1px 12px #aaa
    display: block

ul, li
    padding: 0
    margin: 1px

ul
    list-style: none

.red, .blue, .yellow, .green
    opacity: 0.6
    height: 290px
    border-radius: 150px
    position: absolute
    text-indent: 10000px

.red
    background: #ff5643
    clip: rect(0px, 300px, 150px, 150px)
    width: 296px

.red:hover 
        border: solid 2px;
.blue:hover 
        border: solid 2px;
.yellow:hover 
        border: solid 2px;
.green:hover 
        border: solid 2px;

.yellow
    width: 300px;
    background: #feef33
    clip: rect(150px, 150px, 300px, 0px)

.blue
    background: dodgerblue
    clip: rect(0px, 150px, 150px, 0px)
    width: 300px

.green
    background: #bede15
    clip: rect(150px,300px, 300px, 150px)
    width: 296px

.game-info button
    width: 100px
    height: 50px
    box-sizing: border-box
    font-size: 18px
    color: white
    background: #6dabe8
    border: none
    padding: none

.lose
    visibility: hidden

.game-options h2 
    margin-top: 30px;
    margin-bottom: 0;

.game-options input[type="radio"] 
    margin-right: 20px;

.radio-text
    width: 100px
    text-align: left
    display: inline-block



</style>
