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
let scoreA = 0;
let scoreB = 0;
let aIsNext = true;
let countdown = 10;

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

const setNextPlayer = () => {
    aIsNext = !aIsNext;
    document.querySelector('.next').innerHTML = aIsNext ? 'A' : 'B';
    countdown = 11;
};

const checkPair = () => {
    if (moveCount == 2) {
        const flipped = [...document.querySelectorAll('.flipped')];
        if (
            flipped[0].childNodes[1].childNodes[0].getAttribute('src') ===
            flipped[1].childNodes[1].childNodes[0].getAttribute('src')
        ) {
            flipped.map(e => {
                e.classList.add('identified');
                identifiedCards.push(e);
            });
            if (aIsNext) {
                scoreA = scoreA + 1;
                document.querySelector('.scoreA').innerHTML = scoreA;
            } else {
                scoreB = scoreB + 1;
                document.querySelector('.scoreB').innerHTML = scoreB;
            }
            countdown = 11;
        } else {
            setTimeout(() => setNextPlayer(), 100);
        }
        setTimeout(() => {
            flipped.map(e => e.classList.remove('flipped'));
            moveCount = 0;
            console.log(scoreA + ' ' + scoreB);
            if (identifiedCards.length === images.length * 2) {
                let msg =
                    scoreA === scoreB
                        ? 'TIE!'
                        : scoreA > scoreB
                        ? 'PLAYER A WINS!'
                        : 'PLAYER B WINS';
                fullScreenMsg(msg, () => {
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
            if (!x.classList.contains('identified')) {
                moveCount++;
                if (moveCount < 3) {
                    x.classList.toggle('flipped');
                }
                checkPair();
            }
        });
    }
};

const restartGame = () => {
    aIsNext = true;
    cards.splice(0);
    identifiedCards.splice(0);
    moveCount = 0;
    scoreA = 0;
    scoreB = 0;
    countdown = 11;
    document.querySelector('.gameBoard').innerHTML = '';
    document.querySelector('.scoreA').innerHTML = scoreA;
    document.querySelector('.scoreB').innerHTML = scoreB;
    setup();
};

const setup = () => {
    generateCards();
    shuffleCards(cards);
    appenCards(cards);
    document.querySelector('.next').innerHTML = aIsNext ? 'A' : 'B';
    document.querySelector('.gameCountdown').innerHTML = 10;
};

setup();

const startCountdown = () => {
    setInterval(() => {
        countdown = countdown - 1;
        document.querySelector('.gameCountdown').innerHTML = countdown;
        if (countdown === 0) {
            setTimeout(() => {
                setNextPlayer();
                countdown = 11;
            }, 999);
        }
    }, 1000);
};

startCountdown();
