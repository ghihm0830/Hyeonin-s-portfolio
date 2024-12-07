// Modal
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay =  document.getElementById('modal-overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals =  document.querySelectorAll('.modal.active') 
    modals.forEach(modal =>
        closeModal(modal))
}) /*close modal by clicking background */

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

// Skill slider
const slides = document.querySelector('.slides');
const skills = document.querySelectorAll('.skill');
const dots = document.querySelectorAll('.dot');

let counter = 1;
const maxMoves = 6; // Stop after 5 moves
const slideWidth = skills[0].clientWidth;

function updateDots() {
    dots.forEach((dot, index) => {
      if (index === counter) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
}

let interval = setInterval(slideTransition, 2000);

function slideTransition() {
    slides.style.transition = 'transform 0.5s ease-in-out';
    slides.style.transform = `translateX(${-slideWidth * counter}px)`;
    updateDots();
    counter++;

    // Stop the interval after 5 moves
    if (counter >= maxMoves) {
        clearInterval(interval); // Stop the interval
        setTimeout(() => {
            slides.style.transition = 'none';
            slides.style.transform = `translateX(0px)`; // Reset to the first slide
            counter = 0; // Reset counter
            updateDots();

            // Restart the interval after the reset (3-second pause before restarting)
            setTimeout(() => {
                interval = setInterval(slideTransition, 2000); // Restart interval
            }, 0); // 0-second delay before restarting
        }, 2000); // 2-second delay before resetting to 0
    }

    // Reset counter if it reaches the total number of slides
    if (counter === skills.length) {
        setTimeout(() => {
            slides.style.transition = 'none';
            slides.style.transform = `translateX(0px)`;
            counter = 0; // Reset counter to 0 to loop back to the first image
            updateDots();
        }, 500);
    }
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      slides.style.transition = 'transform 0.5s ease-in-out';
      slides.style.transform = `translateX(${-slideWidth * index}px)`;
      counter = index;
      updateDots();
    });
});


//Email me
const form = document.getElementById('form');
const names = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const errorMsg = document.getElementById('error');

const inputs = form.querySelectorAll('input, textarea'); // Select all inputs and textarea
const labels = form.querySelectorAll('label');

inputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        // Remove the 'active' class from all inputs and textarea and reset background color
        inputs.forEach(i => {
            i.classList.remove('active');
            i.style.backgroundColor = ''; // Reset background color

        // Reset label color
        const label = form.querySelector(`label[for=${i.id}]`);
        if (label) {
            label.style.color = ''; // Reset label color
        }

        });

        // Add the 'active' class to the focused input or textarea and set background color
        e.target.classList.add('active');
        e.target.style.backgroundColor = 'white'; // Set active background color
        // e.target.style.border = '2px solid #272829';

        // Change label color
        const label = form.querySelector(`label[for=${e.target.id}]`);
        if (label) {
            label.style.color = '#272829'; // Set label color when input is active
        }
    });

    input.addEventListener('blur', (e) => {
        // Remove the 'active' class and reset background color when the input loses focus
        e.target.classList.remove('active');
        e.target.style.backgroundColor = ''; // Reset background color
        // e.target.style.border = '';

        // Reset label color
        const label = form.querySelector(`label[for=${e.target.id}]`);
        if (label) {
            label.style.color = ''; // Reset label color
        }
    });
});

function sendEmail() {

    Email.send({
        SecureToken : "e205dd23-ca00-487d-99ef-b7be5196cc21",
        To : 'ghihm0830@gmail.com',
        From : "ghihm0830@gmail.com",
        Subject : "From an employer",
        Body : "Name: " + names.value
        + "<br> Email: " + email.value
        + "<br> Message: " + message.value
    }).then(
        alert("Your message has been delievered successfully!)"),
        setTimeout(() => {
            names.value = '';
            email.value ='';
            message.value ='';
        }, 1000));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('yay');

    let messages = []

    if (names.value === '') {
        messages.push('Oops! Please provide your full name...');
        names.style.border = "2px solid transparent";
        names.style.boxShadow =  "0 0 0.5em red";

        setTimeout(() => {
            names.style.boxShadow = 'unset'
            names.style.border = 'none';
            messages.pop();
            errorMsg.innerText = messages;
        },3000)
    }

    else if (email.value === '') {
        messages.push('Oops! Please provide your email address...');
        email.style.border = "2px solid transparent";
        email.style.boxShadow =  "0 0 0.5em red";

        setTimeout(() => {
            email.style.boxShadow = 'unset'
            email.style.border = 'none';
            messages.pop();
            errorMsg.innerText = messages;
        },3000)
    }

    
    else if (message.value === '') {
        messages.push('Oops! You cannot leave it empty...');
        message.style.border = "2px solid transparent";
        message.style.boxShadow =  "0 0 0.5em red";

        setTimeout(() => {
            message.style.boxShadow = 'unset'
            message.style.border = 'none';
            messages.pop();
            errorMsg.innerText = messages;
        },3000)
    }


    // To show up error message
    if (messages.length > 0) {
        errorMsg.innerText = messages;

        setTimeout(() => {
            errorMsg.innerText = messages;
        },3000)
    }

    else {
        sendEmail();
    }
})

//Copyright year
const year = document.getElementById('year')
const y = new Date();
const currentYear = y.getFullYear();

year.innerHTML = currentYear;