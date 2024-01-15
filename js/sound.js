let characterSwimming = new Audio('audio/swimming.mp3');
let collectCoins = new Audio('audio/coin.mp3');
let getLifeBack = new Audio('audio/reward.mp3');
let collectBottles = new Audio('audio/bottle.mp3');
let hit_by_pufferfish = new Audio('audio/pufferfish_sharkieDmg.mp3');
let hit_by_jellyfish = new Audio('audio/jellyfish_sharkieDmg.mp3');
let jellyfish_defeated = new Audio('audio/jellyfish - isDefeated.mp3');
let bubble_popped = new Audio('audio/bubble_pop.mp3');
let fin_attack = new Audio('audio/fin_attack.mp3');
let bubble_breath = new Audio('audio/takes_breath_for_bubble.mp3');
let new_bubble = new Audio('audio/new_bubble.mp3');
let endboss_fight = new Audio('audio/endboss_fight.mp3');
let game_music = new Audio('audio/game_music.mp3');
let win_game = new Audio('audio/you_win.mp3');
let game_over = new Audio('audio/you_lose.mp3');

let audioOn = true;
let endbossMusic = false;

let allAudio =
    [characterSwimming, collectCoins, getLifeBack, collectBottles, hit_by_pufferfish, hit_by_jellyfish, jellyfish_defeated,
        bubble_popped, fin_attack, bubble_breath, new_bubble, endboss_fight, game_music, win_game, game_over];


game_music.volume = 0.2;
game_music.loop = true;
endboss_fight.volume = 0.3;
endboss_fight.loop = true;
bubble_breath.volume = 0.5;


/**
 * Toggles the volume by changing the visibility of sound icons and controlling the audio state.
 */
function toggleVolume() {
    document.getElementById('soundOn').classList.toggle('d-None');
    document.getElementById('soundOff').classList.toggle('d-None');

    if (audioOn) {
        pauseAllAudio();
        audioOn = false;
    } else {
        playBackgroundMusic();
        audioOn = true;
    }
}


/**
 * Pauses all audio elements in the `allAudio` array and updates the `audioOn` variable to false.
 */
function pauseAllAudio() {
    allAudio.forEach((audio) => {
        audio.pause();
        audioOn = false;
    })
}


/**
 * Plays the background music based on the `endbossMusic` variable.
 */
function playBackgroundMusic() {
    if (endbossMusic) {
        endboss_fight.play();
    } else {
        game_music.play();
    }
}


/**
 * Plays a specified audio element if the audio is turned on.
 * 
 * @param {HTMLAudioElement} audioName - The audio element to be played.
 */
function playSound(audioName) {
    if (audioOn) {
        audioName.play();
    }
}