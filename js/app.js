import {config} from '../secrets.js';

// Initialize Firebase
firebase.initializeApp(config);

var db = firebase.firestore();

const docRef = db.collection('subscribers').doc('email-list');

const email = document.querySelector('#email');
const subscribe = document.querySelector('#subscribe');
const text = document.querySelector('#validator-text');
var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


email.addEventListener('keydown', () => {

    console.log('click');

    if (email.value.match(pattern)) {
        subscribe.removeAttribute('disabled', false);
        text.innerHTML = "Email is Valid. Please submit";
        text.classList.add('valid');
        text.classList.remove('invalid');

    } else {
        subscribe.setAttribute('disabled', true);
        text.innerHTML = "Email is invalid, Please input a valid email address.";
        text.classList.add('invalid');
        text.classList.remove('valid');
    }

    if (email.value == "") {
        text.removeAttribute('class');
        text.innerHTML = '';
    }

});

subscribe.addEventListener('click', () => {
    const subscribersEmail = email.value;

    docRef.update({
        emails: firebase.firestore.FieldValue.arrayUnion(subscribersEmail)
    });

    console.log('yes');

    email.style.display = 'none';
    subscribe.style.display = 'none';
    text.innerHTML = 'Thank You for Subscribing!';

});