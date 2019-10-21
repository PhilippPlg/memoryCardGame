const images = [
    ['dWeysUqukg', '#FD1969'],
    ['7gCbWBRY0H', '#C47AC0'],
    ['arSOCj5bCt', '#F0F0C9'],
    ['MvuVRSmg54', '#2BA84A'],
    ['StKydQsEm1', '#E4B363'],
    ['8a46hr6zQ6', '#EF6461']
];
const cards = [];
const identifiedCards = [];
let moveCount = 0;
let score = 0;
let moveLimit = 15;
let currentMove = moveLimit;

const fullScreenMsg = (msg, callback) => {
    let e = document.createElement('div');
    let p = document.createElement('p');
    p.innerHTML = msg;
    e.classList.add('fullScreenMsg');
    e.appendChild(p);
    document.body.appendChild(e);
    setTimeout(() => {
        document.body.removeChild(e);
        callback();
    }, 2750);
};

const generateCards = () => {
    images.map(imgArr => {
        let elem = document.createElement('div');
        let front = document.createElement('div');
        let back = document.createElement('div');
        let img = document.createElement('img');
        elem.classList.add('card');
        front.classList.add('front');
        back.classList.add('back');
        back.style.backgroundColor = imgArr[1];
        img.setAttribute('src', './img/' + imgArr[0] + '.png');
        back.appendChild(img);
        elem.appendChild(front);
        elem.appendChild(back);
        cards.push(elem);
        cards.push(elem.cloneNode(true));
    });
};

const shuffleCards = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};

const checkPair = () => {
    if (moveCount == 2) {
        currentMove = currentMove - 1;
        document.querySelector('.moves').innerHTML = currentMove;
        const flipped = [...document.querySelectorAll('.flipped')];
        if (
            flipped[0].childNodes[1].childNodes[0].getAttribute('src') ===
            flipped[1].childNodes[1].childNodes[0].getAttribute('src')
        ) {
            flipped.map(e => {
                e.classList.add('identified');
                identifiedCards.push(e);
            });
            score = score + 1;
            document.querySelector('.score').innerHTML = score;
        }
        setTimeout(() => {
            flipped.map(e => e.classList.remove('flipped'));
            moveCount = 0;
            if (currentMove == 0) {
                fullScreenMsg('Loser! Try is again!', () => {
                    restartGame();
                });
            } else if (identifiedCards.length === images.length * 2) {
                fullScreenMsg('Winner!', () => {
                    restartGame();
                });
            }
        }, 500);
    }
};

const appenCards = cards => {
    for (let x of cards) {
        document.querySelector('.gameBoard').appendChild(x);
        x.addEventListener('click', () => {
            if (currentMove > 0) {
                if (!x.classList.contains('identified')) {
                    moveCount++;
                    if (moveCount < 3) {
                        x.classList.toggle('flipped');
                    }
                    checkPair();
                }
            } else {
                //fullScreenMsg('Loser! Try is again!');
                fullScreenMsg('Loser! Try is again!', () => {
                    restartGame();
                });
            }
        });
    }
};

const restartGame = () => {
    cards.splice(0);
    moveCount = 0;
    score = 0;
    currentMove = moveLimit;
    document.querySelector('.gameBoard').innerHTML = '';
    document.querySelector('.score').innerHTML = score;
    document.querySelector('.moves').innerHTML = currentMove;
    setup();
};

const setup = () => {
    generateCards();
    shuffleCards(cards);
    appenCards(cards);
    document.querySelector('.moves').innerHTML = currentMove;
};

setup();
