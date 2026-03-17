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

// HERO

const imgs = ['animal.webp', 'animal2.webp', 'animal3.jpg', 'animal4.jpeg', 'animal5.webp', 'animal6.jpg', 'animal7.jpg', 'animal8.jpg', 'animal9.avif', 'animal10.jpg', 'animal11.jpg', 'animal12.webp', 'animal13.avif', 'animal14.jpg', 'animal15.jpg',]

function heroAnimal() {
    const heroImgs = document.querySelectorAll('.hero-img')

    heroImgs.forEach((heroImg) => {

        const randomImg = imgs[Math.floor(Math.random() * imgs.length)]

        heroImg.src = `/asset/${randomImg}`
    })
}

heroAnimal()
setInterval(heroAnimal, 300000)

// RANDOM THREATENED SPECIES

const species = [
    { url: 'Vietnam-Pheasant.webp', text: ' The Vietnam Pheasant is a rare forest bird from Vietnam with vibrant plumage. It is threatened due to habitat loss and hunting.' },
    { url: 'crocodile.jpg', text: 'The Slender-snouted Crocodile is a freshwater crocodile found in West and Central Africa. It is critically endangered due to habitat loss and hunting.' },
    { url: 'blue-iguana.jpg', text: 'The Grand Cayman Blue Iguana is a large, vibrant lizard native to Grand Cayman. It is critically endangered and mainly threatened by habitat loss and invasive species.' },
    { url: 'sun-bear.avif', text: 'The Sun Bear is a small bear from Southeast Asian tropical forests. It is vulnerable due to deforestation and poaching.' },
    { url: 'dolphin.jpeg', text: 'The Irrawaddy Dolphin is a freshwater and coastal dolphin found in Southeast Asia. It is endangered due to habitat degradation and fishing activities.' },
    { url: 'box-turtle.jpg', text: 'The Chinese Three-striped Box Turtle is a freshwater turtle native to China. It is endangered due to habitat loss and collection for the pet trade.' },
    { url: 'pangolin.webp', text: 'The Sunda Pangolin is a nocturnal mammal from Southeast Asia, known for its protective scales. It is critically endangered due to poaching and illegal wildlife trade.' },
    { url: 'mockingbird.jpg', text: 'The Floreana Mockingbird is a rare bird from the Galápagos Islands. It is critically endangered due to habitat loss and introduced predators.' },
    { url: 'rabbit.jpg', text: 'The Tehuantepec Jackrabbit (Lepus flavigularis) is a rare hare native to southern Mexico. It is endangered due to habitat loss and limited range.' },
    { url: 'malay-tapir.jpg', text: 'The Malay Tapir is a large, forest-dwelling mammal from Southeast Asia. It is endangered due to deforestation and hunting.' },
    { url: 'glass-frog.jpg', text: 'The Burrowes Giant Glass Frog is a rare amphibian from the rainforests of Ecuador. It is endangered due to habitat loss and pollution.' },
    { url: 'delacour-langur.jpg', text: `The Delacour's Langur is a rare monkey native to northern Vietnam. It is critically endangered due to habitat loss and hunting.` },
    { url: 'giant-otter.jpg', text: 'The Giant Otter is a large river otter found in South America’s wetlands and rivers. It is endangered due to habitat loss, pollution, and hunting.' },
    { url: 'imperial-woodpecker.webp', text: 'The Imperial Woodpecker was a huge woodpecker from Mexico’s Sierra Madre forests, with black plumage, white wing patches, and a red crest. It fed on insect larvae and is now believed to be critically endangered or extinct.' },
    { url: 'largetooth-sawfish.webp', text: 'The Largetooth Sawfish is a large, flat-bodied ray with a long, toothed snout (“saw”) used to detect and slash prey. It lives in coastal and freshwater habitats in tropical regions, and is critically endangered due to overfishing and habitat loss.' },
    { url: 'sand-tiger.jpg', text: 'The Largetooth Sawfish is a large, flat-bodied ray with a long, toothed snout (“saw”) used to detect and slash prey. It lives in coastal and freshwater habitats in tropical regions, and is critically endangered due to overfishing and habitat loss.' },
    { url: 'cylindrical-skink.jpg', text: 'The Ebner’s Cylindrical Skink is a legless, snake-like lizard found in parts of Southeast Asia. It has a smooth, shiny body adapted for burrowing and spends most of its time underground, feeding on small invertebrates.' },
    { url: 'lowland-anoa.jpg', text: 'The Lowland Anoa is a small, forest-dwelling buffalo native to Sulawesi, Indonesia. It has a compact body, short horns, and is critically endangered due to habitat loss and hunting.' }
]

function oneAnimal() {
    const img = document.getElementById('endangered-img')
    const text = document.getElementById('endangered-text')
    const randomAnimal = species[Math.floor(Math.random() * species.length)]

    img.src = `/asset/${randomAnimal.url}`
    text.innerHTML = `${randomAnimal.text}`

}
oneAnimal()
setInterval(oneAnimal, 300000)

// SEACH

let animalInfo = []

function safeJson(res) {
    return res.text().then(text => {
        return text ? JSON.parse(text) : {}
    })
}

let animal = {
    fetchAnimal: function (name) {
        const imgPromise = fetch(`https://api.inaturalist.org/v1/taxa?q=${name}`)
            .then(res => res.json())
            .then(data => {
                if (data.results[0].default_photo === null) {
                    return '/asset/no-img-found.png'
                } else {
                    return data.results[0].default_photo.medium_url
                }

            })

        const animalPromise = fetch(`https://api.gbif.org/v1/species/match?scientificName=${encodeURIComponent(name)}`)
            .then(response => response.json())
            .then(data => {
                const usageKey = data.usageKey

                const statusPromise = fetch(`https://api.gbif.org/v1/species/${data.usageKey}/iucnRedListCategory`)
                    .then(res => safeJson(res))
                    .then(status => {

                        return status.category || 'Unknown'

                    })
                const descPromise = fetch(`https://api.gbif.org/v1/species/${usageKey}/descriptions`)
                    .then(res => res.json())
                    .then(desc => {
                        const validDesc = desc.results.filter(d => d.type === "biology_ecology").map(d => d.description)
                        return validDesc.join(' ') || 'NO DESCRIPTION AVAILABLE'
                    })

                return Promise.all([statusPromise, descPromise])
                    .then(([status, description]) => ({
                        status, description
                    }))

            })
        Promise.all([imgPromise, animalPromise])
            .then(([img, animalData]) => {
                animalInfo.push({
                    url: img,
                    status: animalData.status,
                    description: animalData.description
                })
                localStorage.setItem('animalInfo', JSON.stringify(animalInfo))
                this.displayAnimal()
            })
    },
    displayAnimal: function () {

        const statusValue = document.getElementById('status-value')
        const descValue = document.getElementById('desc-value')
        const img = document.getElementById('result-img')


        img.src = animalInfo[0].url
        statusValue.innerHTML = animalInfo[0].status

        const text = animalInfo[0].description
        const eachText = text.split('.').map(sen => `<p>${sen}</p>`).join('')


        descValue.innerHTML = eachText
    },

    searchAnimal: function () {
        const searchTerm = document.querySelector(".search-bar").value
        animalInfo = []
        this.fetchAnimal(searchTerm)
    }
}

const searchBar = document.querySelector(".search-bar")

searchBar.addEventListener('click', () => {
    alert('PLEASE USE SCIENTIFIC NAME')

})

searchBar.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {

        animal.searchAnimal()

    }
})

const searchIcon = document.querySelector(".search button")

searchIcon.addEventListener('click', (e) => {

    animal.searchAnimal()
})

let previousSearch = JSON.parse(localStorage.getItem('animalInfo')) || []
if (previousSearch.length > 0) {
    animalInfo = previousSearch
    animal.displayAnimal(previousSearch)
}


