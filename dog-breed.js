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


// API DOG BREED FINDER

const questions = [

    {
        question: 'How much does your ideal dog shed?',
        answers: [
            { text: 'very low', icon: '/asset/dog_icon.png' },
            { text: 'low', icon: '/asset/dog_icon.png' },
            { text: 'moderate', icon: '/asset/dog_icon.png' },
            { text: 'high', icon: '/asset/dog_icon.png' },
            { text: 'very high', icon: '/asset/dog_icon.png' }
        ]

    },
    {
        question: 'How much does your ideal dog bark?',
        answers: [
            { text: 'quite', icon: '/asset/dog_icon.png' },
            { text: 'low', icon: '/asset/dog_icon.png' },
            { text: 'moderate', icon: '/asset/dog_icon.png' },
            { text: 'loud', icon: '/asset/dog_icon.png' },
            { text: 'very loud', icon: '/asset/dog_icon.png' }
        ]

    },
    {
        question: 'How energetic should your ideal dog be?',
        answers: [
            { text: 'calm', icon: '/asset/dog_icon.png' },
            { text: 'low', icon: '/asset/dog_icon.png' },
            { text: 'moderate', icon: '/asset/dog_icon.png' },
            { text: 'active', icon: '/asset/dog_icon.png' },
            { text: 'very active', icon: '/asset/dog_icon.png' }
        ]

    },
    {
        question: 'How much should your ideal dog weigh?',
        answers: [
            { text: '< 15 lb', icon: '/asset/dog_icon.png' },
            { text: '15 - 30 lb', icon: '/asset/dog_icon.png' },
            { text: '30 - 50 lb ', icon: '/asset/dog_icon.png' },
            { text: '50 - 110 lb', icon: '/asset/dog_icon.png' },
            { text: '> 110 lb ', icon: '/asset/dog_icon.png' }
        ]

    },
    {
        question: 'How easy should it be to train your ideal dog?',
        answers: [
            { text: 'difficult', icon: '/asset/dog_icon.png' },
            { text: 'challenging', icon: '/asset/dog_icon.png' },
            { text: 'average', icon: '/asset/dog_icon.png' },
            { text: 'easy', icon: '/asset/dog_icon.png' },
            { text: 'very easy', icon: '/asset/dog_icon.png' }
        ]

    },
    {
        question: 'How protective should your ideal dog be?',
        answers: [
            { text: 'low', icon: '/asset/dog_icon.png' },
            { text: 'some', icon: '/asset/dog_icon.png' },
            { text: 'moderate', icon: '/asset/dog_icon.png' },
            { text: 'high', icon: '/asset/dog_icon.png' },
            { text: 'very high', icon: '/asset/dog_icon.png' }
        ]

    },
    {
        question: '',
        answers: [
            { text: '', icon: '/asset/dog_icon.png' },
            { text: '', icon: '/asset/dog_icon.png' },
            { text: '', icon: '/asset/dog_icon.png' },
            { text: '', icon: '/asset/dog_icon.png' },
            { text: '', icon: '/asset/dog_icon.png' }
        ]

    }
]



const nextBtn = document.getElementById('next-btn')
let currentQuestionIndex = 0
let dogQuestion = document.getElementById('dog-question')
let questionNumber = document.getElementById('question-number')
const dogIcons = document.querySelectorAll('.input-img')
const dogAnswers = document.querySelectorAll('.input-text')
const options = document.querySelector('.options')
const resultBtn = document.getElementById('result-btn')
const restartBtn = document.getElementById('restart-btn')
const previousResult = document.getElementById('previous-search')

function displayQuestion() {

    dogQuestion.innerHTML = questions[currentQuestionIndex].question

    dogIcons.forEach((dogIcon, index) => {
        dogIcon.src = `${questions[currentQuestionIndex].answers[index].icon}`
    })

    dogAnswers.forEach((dogAnswer, index) => {
        dogAnswer.innerHTML = `${questions[currentQuestionIndex].answers[index].text}`
    })

}

displayQuestion()

nextBtn.addEventListener('click', () => {

    const selectedInput = document.querySelector("input[name='answer']:checked")
    const inputs = document.querySelectorAll('input[name="answer"]')

    if (!selectedInput) {
        alert('PLEASE CHOOSE AN OPTION BEFORE GOING TO THE NEXT QUESTION')
        return
    }

    const selectedAnswer = selectedInput.value

    currentQuestionIndex++
    displayQuestion()
    userAnswers.push(selectedAnswer)
    console.log(userAnswers)

    if (currentQuestionIndex == 6) {
        nextBtn.style.display = 'none'
        optionDescription.style.display = 'none'
        inputs.forEach(input => { input.disabled = true })
        resultBtn.style.display = 'inline-block'
        restartBtn.style.display = 'inline-block'
    }

    questionNumber.innerHTML = currentQuestionIndex + 1



    inputs.forEach(input => { input.checked = false })
})

// API RESULT

const userAnswers = []
const cardContainer = document.getElementById('result-container')
const cardImgs = document.querySelectorAll('.card-img-top')
const cardTexts = document.querySelectorAll('.card-tx-mv')
const cardTitles = document.querySelectorAll('.card-tl-mv')
const optionDescription = document.querySelector('div.action h3')

const trait = {

    goodWithChildren: {
        1: ' is Not recommended for homes with children, prefers a quiet environment',
        2: ' Can tolerate children but may need supervision and proper training',
        3: ' is Generally okay with children but depends on training and socialization',
        4: ' is Very good with children and enjoys family interaction',
        5: ' is Excellent with children, Extremely patient and family-friendly',
    },
    goodWithStranger: {
        1: ' is Very wary of strangers and may be aggressive toward unfamiliar people',
        2: ' is Cautious around strangers and may need time to warm up',
        3: ' Generally neutral with strangers, friendly if approached properly',
        4: ' is Friendly and sociable with most strangers',
        5: ' is Extremely friendly with everyone, loves meeting new people',
    },

    grooming: {
        1: ' needs Very low grooming  and an Easy to maintain coat',
        2: ' needs Low grooming  and Occasional brushing is enough',
        3: ' needs Moderate grooming required and Needs regular brushing',
        4: ' needs High grooming , Frequent brushing and occasional trimming required',
        5: ' needs Very high grooming , Daily grooming and professional care recommended',
    },
    playfulness: {
        1: ' is Not very playful Prefers calm activities and quiet time',
        2: ' is Occasionally playful, Enjoys some games but generally calm',
        3: ' is Moderately playful, Likes to play but also rests well',
        4: ' is Very playful Enjoys games, toys, and interaction frequently',
        5: ' is Extremely playful, Needs lots of activities and engagement',
    }
}


const dog = {

    apiKey: '2zcECL1SzhcNipevbfwmnonYPqIFNl9vuobj7om1',

    fetchDog: function () {

        let shedding = Number(userAnswers[0])
        let barking = Number(userAnswers[1])
        let energy = Number(userAnswers[2])

        fetch(`https://api.api-ninjas.com/v1/dogs?v1/dogs?shedding=${shedding}&barking=${barking}&energy=${energy}&limit=3`, {
            headers: {
                "X-Api-Key": this.apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data = this.randomSlice(data)
                localStorage.setItem('data', JSON.stringify(data))
                this.displayDog(data)
            })
    },
    randomSlice: function (data) {
        const start = Math.floor(Math.random() * (data.length - 2))
        return data.slice(start, start + 3)
    },

    displayDog: function (data) {

        cardContainer.innerHTML = ''

        data.forEach(dog => {

            const card = `
            <div class="card  card-mv">
                <img src="${dog.image_link}" class="card-img-top" alt="dog">
                <div class="card-body">
                        <h5 class="card-title card-tl-mv">${dog.name}</h5>
                        <p class="card-text card-tx-mv">This dog ${trait.goodWithChildren[dog.good_with_children]}, ${trait.goodWithStranger[dog.good_with_strangers]}, ${trait.grooming[dog.grooming]},and ${trait.playfulness[dog.playfulness]}</p>
                        </div>
            </div>`

            cardContainer.innerHTML += card
        })
    }
}

resultBtn.addEventListener('click', () => {
    previousResult.style.display = 'none'
    options.style.display = 'none'
    dogQuestion.style.display = 'none'
    dog.fetchDog()
})

restartBtn.addEventListener("click", () => {
    location.reload()
    previousResult.style.display = 'inline'

})

let previousDog = JSON.parse(localStorage.getItem('data')) || []
dog.displayDog(previousDog)




