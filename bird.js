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

birdInfo = []

let region = {

    apiKey: 'qk0eq346bsgc',

    fetchRegion: function (name) {

        fetch("https://api.ebird.org/v2/ref/region/list/country/world", {
            headers: {
                "X-eBirdApiToken": this.apiKey
            }
        })
            .then(res => res.json())
            .then(data => {
                const match = data.find(r =>
                    r.name.toLowerCase() == name.toLowerCase()
                )

                if (match) {
                    const regionCode = match.code

                    fetch(`https://api.ebird.org/v2/data/obs/${regionCode}/recent/notable?back=30&maxResults=5`, {
                        headers: {
                            "X-eBirdApiToken": this.apiKey
                        }
                    })
                        .then(res => res.json())
                        .then(data => {

                            const birdPromise = data.map(bird => {
                                const imgPromise = fetch(`https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(bird.sciName)}`)
                                    .then(res => res.json())
                                    .then(img => {
                                        return img.results[0].default_photo.medium_url
                                    })

                                const descPromise = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bird.sciName)}`)
                                    .then(res => res.json())
                                    .then(data => {
                                        return data.extract
                                    })

                                return Promise.all([imgPromise, descPromise])
                                    .then(([img, desc]) => ({
                                        name: bird.comName,
                                        url: img,
                                        desc: desc
                                    }))
                            })
                            Promise.all(birdPromise)
                                .then(results => {
                                    birdInfo = results
                                    localStorage.setItem('birdInfo', JSON.stringify(birdInfo))
                                    this.displayRegion()
                                })

                        })
                }
            })
    },
    displayRegion: function () {
        const description = document.querySelector('.description')
        description.innerHTML = ''

        if (birdInfo.length == 0) {
            return  description.innerHTML = `<h2>NO OBSERVATIONS FOUNd IN THIS COUNTRY</h2>`
        } else {

            birdInfo.forEach(b => {

                let birdHtml = `
                 <div class='result'>
                    <h2 class='bird-name'>${b.name}</h2>
                    <img src='${b.url}' alt='NO BIRD IMAGE FOUND' class='bird-img'>
                     <p class='bird-text'>${b.desc}</p>
                 </div>  `

                 description.innerHTML += birdHtml
            })
        }



    },

    searchRegion: function () {
        const searchTerm = document.querySelector(".search-bar").value
        birdInfo = []
        this.fetchRegion(searchTerm)
    }
}

const searchBar = document.querySelector(".search-bar")

searchBar.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {

        region.searchRegion()
    }
})

const searchIcon = document.querySelector(".search button")

searchIcon.addEventListener('click', (e) => {

    region.searchRegion()
})

let previousSearch = JSON.parse(localStorage.getItem('birdInfo')) || []
if (previousSearch.length > 0) {
    birdInfo = previousSearch
    region.displayRegion(previousSearch)
}