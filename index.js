// NAVBAR SCROOL EFFECT 

window.addEventListener('scroll', () => {

    const navBar = document.querySelector('.nav-mv')
    const navLinks = document.querySelectorAll('.nav-link-mv')

    if (window.scrollY > 60) {

        navLinks.forEach((navLink) => {
            navLink.classList.add('scroll-an')
        })

        navBar.classList.add('scroll-an')
    } else {

        navLinks.forEach((navLink) => {
            navLink.classList.remove('scroll-an')
        })

        navBar.classList.remove('scroll-an')
    }

})

// HERO IMAGE AND FACTS

const Facts = [
    "Elephants can recognize themselves in mirrors.",
    "Octopuses have three hearts and blue blood.",
    "A group of flamingos is called a flamboyance.",
    "Cows have 'best friends' and get stressed when separated.",
    "Dolphins have names for each other.",
    "Arctic Terns fly 40,000 miles yearly—the longest migration on Earth.",
    "The Heart of a shrimp is located in its head.",
    "Flamingos are born grey; they turn pink from eating brine shrimp.",
    "A Snail can sleep for three years to survive dry weather.",
    "Sloths can hold their breath underwater for up to 40 minutes.",
    "The Blue Whale’s heart is the size of a bumper car.",
    "Elephants are the only mammals that cannot jump.",
    "Male Seahorses are the ones who give birth to offspring.",
    "The Wood Frog can survive being frozen solid in winter.",
    "Hummingbirds are the only birds that can fly backwards.",
    "Platypuses glow a bluish-green color under ultraviolet light.",
    "Koala fingerprints are so human-like they’ve confused crime scenes.",
    "Honeybees can recognize human faces with high accuracy.",
    "A Cheetah can accelerate from 0 to 60 mph in just 3 seconds.",
    "Ostrich eyes are larger than their brains.",
    "The Mantis Shrimp’s punch is as fast as a .22 caliber bullet.",
    "Giraffes have no vocal cords and communicate through infrasound.",
    "Crows can remember specific human faces for many years.",
    "A jellyfish is 95% water and has no brain, heart, or lungs.",
    "Butterfly taste buds are located on their feet.",
    "The Axolotl can regrow its limbs, heart, and even parts of its brain.",
    "Sharks have been on Earth longer than trees have.",
    "Otters hold hands while sleeping to keep from drifting apart.",
    "A Blue Whale's heart is so large a human could swim through the arteries.",
    "Tigers have striped skin, not just striped fur.",
    "Male Gentoo Penguins 'propose' to mates with a pebble.",
    "A shark is the only fish that can blink with both eyes.",
    "Ants never sleep and they don't have lungs.",
    "A cat's jaw cannot move sideways, only up and down.",
    "Polar bear fur is actually clear, and their skin is black.",
    "A Woodpecker's tongue wraps around its brain to protect it from impact.",
    "Butterflies taste with their feet to find the right leaves for eggs.",
    "An Elephant's trunk has over 40,000 individual muscles.",
    "Rats laugh when they are tickled, though it's at a high frequency.",
    "Seahorses are monogamous and travel in pairs holding tails.",
    "The world's smallest mammal is the Bumblebee Bat.",
    "Cows can sleep standing up, but they only dream while lying down.",
    "A Squirrel's front teeth never stop growing throughout their life.",
    "Honeybees can flap their wings 200 times per second.",
    "Octopuses can regrow a lost arm in about 100 days.",
    "The Golden Poison Frog has enough toxins to kill 10 grown men.",
    "Pigeons can do math at a level similar to monkeys.",
    "Reindeer eyes turn blue in winter to help them see in low light.",
    "A Rhino's horn is made of keratin—the same stuff as your hair.",
    "Dogs' nose prints are as unique as human fingerprints.",
    "Owls cannot move their eyeballs; they must turn their entire head.",
    "Giraffes only need 5 to 30 minutes of sleep in a 24-hour period."
]

const imgs = ['lion1.webp', 'lion2.jpg', 'lion3.webp', 'lion4.jpg', 'tiger1.jpg', 'tiger2.webp', 'tiger3.jpg', 'tiger4.jpg', 'jauger1.webp', 'jauger2.webp', 'jauger3.jpg', 'jauger4.jpg', 'redpanda1.avif', 'redpanda2.avif', 'redpanda3.webp', 'redpanda4.jpg', 'fox1.jpg', 'fox2.webp', 'fox3.jpg', 'fox4.jpg',]

function heroAnimal() {

    // Facts
    const heroFacts = document.querySelectorAll('.hero-fact')

    heroFacts.forEach((heroFact) => {

        const randomFact = Facts[Math.floor(Math.random() * Facts.length)]

        heroFact.innerHTML = randomFact

    })

    // IMAGES
    const heroImgs = document.querySelectorAll('.hero-img')

    heroImgs.forEach((heroImg) => {

        const randomImg = imgs[Math.floor(Math.random() * imgs.length)]

        heroImg.src = `/asset/${randomImg}`
    })
}

heroAnimal()
setInterval(heroAnimal, 300000)

