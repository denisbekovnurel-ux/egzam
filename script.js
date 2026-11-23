const regExp = /^\d+$/

const containsOnlyDigits = (str) => {
    return regExp.test(str)
}

console.log(containsOnlyDigits("12345")); // true
console.log(containsOnlyDigits("12a45")); // false

const everySecond = () => {
    setInterval(() => {
        console.log("Прошла секунда");
    }, 1000)
}

const count = () => {
    let i = 1;
    const interval = setInterval(() => {
        console.log(i);

        if (i >= 10) {
            clearInterval(interval)
        }

        i++
    }, 1000)
}

count()

const timerEl = document.getElementById('timer')
const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const resetBtn = document.getElementById('resetBtn')

const START_TIME = 10
let timeLeft = START_TIME
let timerInterval = null

const renderTimer = () => {
    timerEl.textContent = timeLeft
}

startBtn.addEventListener('click', () => {
    if (timerInterval) return
    if (timeLeft <= 0) return

    timerInterval = setInterval(() => {
        timeLeft--
        renderTimer()

        if (timeLeft <= 0) {
            clearInterval(timerInterval)
            timerInterval = null
        }
    }, 1000)
})

stopBtn.addEventListener('click', () => {
    clearInterval(timerInterval)
    timerInterval = null
})

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval)
    timerInterval = null
    timeLeft = START_TIME
    renderTimer()
})

const box = document.querySelector('.box')

box.addEventListener('click', () => {
    box.classList.toggle('active')
})

const request = new XMLHttpRequest()

request.open('GET', 'test.json')
request.setRequestHeader('Content-type', 'application/json')
request.send()

request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
        const data = JSON.parse(request.response)
        console.log(data)
    } else {
        console.error('Ошибка запроса:', request.status)
    }
}

request.onerror = () => {
    console.error('Ошибка сети')
}

const loginInput = document.getElementById('loginInput')
const checkBtn = document.getElementById('checkBtn')
const userCard = document.getElementById('userCard')
const message = document.getElementById('message')

const defaultImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' fill='%23ccc'/></svg>"

checkBtn.addEventListener('click', async () => {
    userCard.innerHTML = ''
    message.textContent = ''

    const login = loginInput.value.trim()

    if (!login) {
        message.textContent = 'Введите логин'
        return
    }

    try {
        const response = await fetch('users.json')

        if (!response.ok) {
            throw new Error('Ошибка запроса')
        }

        const users = await response.json()
        const user = users.find((item) => item.login === login)

        if (!user) {
            message.textContent = 'Пользователь не найден'
            return
        }

        userCard.innerHTML = `
            <div class="user-card">
                <img src="${user.image || defaultImage}" alt="${user.login}">
                <h3>${user.login}</h3>
                <p>${user.role}</p>
                <p>${user.email}</p>
            </div>
        `
    } catch (error) {
        message.textContent = 'Не удалось выполнить запрос'
    }
})

const getUser = (fail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fail) {
                reject(new Error('Ошибка загрузки пользователя'))
            } else {
                resolve({ id: 1, name: 'John' })
            }
        }, 1000)
    })
}

const getPosts = (fail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fail) {
                reject(new Error('Ошибка загрузки постов'))
            } else {
                resolve(['Пост 1', 'Пост 2'])
            }
        }, 2000)
    })
}

const getComments = (fail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fail) {
                reject(new Error('Ошибка загрузки комментариев'))
            } else {
                resolve(['Комментарий 1', 'Комментарий 2'])
            }
        }, 3000)
    })
}

Promise.all([getUser(), getPosts(), getComments()])
    .then(([user, posts, comments]) => {
        console.log({ user, posts, comments })
    })
    .catch((error) => {
        console.error(error.message)
    })

const getUserData = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error.message)
    } finally {
        console.log('Запрос завершён')
    }
}

getUserData(1)

const createPhoto = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                albumId: 1,
                title: 'Новое фото',
                url: 'https://via.placeholder.com/600/92c952',
                thumbnailUrl: 'https://via.placeholder.com/150/92c952'
            })
        })

        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error.message)
    }
}

createPhoto()
