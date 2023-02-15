document.addEventListener('DOMContentLoaded', function () {
  uiInput()
  contactForm()
  quiz()
  footer()
  popup()
  widgetNav()
  widgetCall()
  widgetVideo()
  widgetGift()
})

window.addEventListener('load', () => {
  document.body.classList.remove('transition-disabled')
  luckyWheel()
})

function uiInput() {
  for (const inputContainer of document.querySelectorAll('.ui-input--file')) {
    const input = inputContainer.querySelector('input')
    input.addEventListener('change', function (event) {
      inputContainer.querySelector('.ui-input__filename').textContent = event.target.files[0].name
    })
  }
}

function footer() {
  const disclaimerButton = document.querySelector('.footer__unfold')
  const disclaimerContainer = document.querySelector('.footer__disclaimer')
  if (disclaimerButton) {
    disclaimerButton.addEventListener('click', function () {
      $(disclaimerContainer).slideToggle()
      this.classList.toggle('active')
    })
  }
}

function popup() {
  for (const popupElement of document.querySelectorAll('.popup')) {
    popupElement.querySelector('.popup__close-btn').addEventListener('click', function () {
      popupElement.classList.remove('active')
      document.documentElement.style.overflow = ''
    })

    popupElement.addEventListener('click', (event) => {
      if (event.target === popupElement) {
        popupElement.classList.remove('active')
        document.documentElement.style.overflow = ''
      }
    })
  }

  window.openPopup = function (id) {
    const popupElement = document.querySelector(`#${id}`)
    if (popupElement) {
      document.querySelector(`#${id}`).classList.add('active')
      document.documentElement.style.overflow = 'hidden'
    }
  }

  if (document.querySelector('#leave')) {
    let isPopupShown = false
    document.addEventListener('mouseleave', (event) => {
      if (event.clientY < 0 && !isPopupShown) {
        window.openPopup('leave')
        isPopupShown = true
      }
    })
  }
}

function widgetNav() {
  const widgetElement = document.querySelector('.widget-nav')
  if (widgetElement) {
    widgetElement.querySelector('.widget-nav__button').addEventListener('click', function () {
      widgetElement.classList.toggle('active')
    })

    document.addEventListener('click', (event) => {
      const withinBoundaries = event.composedPath().includes(widgetElement)
      if (!withinBoundaries) widgetElement.classList.remove('active')
    })

    const items = widgetElement.querySelectorAll('.widget-nav__item')
    for (const item of items) {
      item.addEventListener('click', () => widgetElement.classList.remove('active'))
    }
  }
}

function widgetCall() {
  const widgetElement = document.querySelector('.widget-call')
  if (widgetElement) {
    document.addEventListener('scroll', function () {
      if (window.innerWidth < 767 && document.documentElement.scrollTop > 120) {
        widgetElement.classList.add('active')
      } else {
        widgetElement.classList.remove('active')
      }
    })
  }
}

function widgetVideo() {
  const widgetElement = document.querySelector('.widget-video')

  if (widgetElement) {
    const player = new Plyr(document.querySelector('.widget-video__container'), {
      controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'captions', 'fullscreen'],
      hideControls: true,
      ratio: widgetElement.classList.contains('widget-video--vertical') ? '9:16' : '16:9',
      youtube: {
        rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1
      }
    })

    const closeButton = widgetElement.querySelector('.widget-video__close-btn')
    closeButton.addEventListener('click', () => {
      player.stop()
      widgetElement.classList.add('hide')
    })

    document.addEventListener('click', (event) => {
      if (event.target.closest('button.plyr__control--overlaid') && !player.fullscreen.active) {
        player.fullscreen.enter()
      }
    })
  }
}

function widgetGift() {
  const widgetElement = document.querySelector('.widget-gift')
  if (widgetElement) {
    widgetElement.querySelector('.widget-gift__close-btn').addEventListener('click', function () {
      widgetElement.classList.add('hide')
    })
  }
}

function quiz() {
  const quizContainer = document.querySelector('.quiz')
  if (quizContainer) {
    const progressBar = quizContainer.querySelector('.quiz__progress-val')
    const progressPercent = quizContainer.querySelector('.quiz__progress-num')
    const items = quizContainer.querySelectorAll('.quiz-item')
    let currentItem = 0
    const countItems = items.length

    const actionsWrapper = quizContainer.querySelector('.quiz__actions')
    const backButton = actionsWrapper.querySelector('[data-quiz-back]')
    const nextButton = actionsWrapper.querySelector('[data-quiz-next]')

    const passedElement = quizContainer.querySelector('.quiz-passed')

    const prizes = quizContainer.querySelectorAll('.quiz-prize__img')
    const prizeTitle = quizContainer.querySelector('.quiz-prize__title')

    const radios = quizContainer.querySelectorAll('.ui-choose input')
    for (const radio of radios) {
      radio.addEventListener('change', function () {
        if (this.checked) {
          items[currentItem].dataset.quizValidate = ''
          nextButton.classList.remove('ui-button--disabled')
        } else if (items[currentItem].querySelectorAll('.ui-choose input:checked').length === 0) {
          delete items[currentItem].dataset.quizValidate
          nextButton.classList.add('ui-button--disabled')
        }
      })
    }

    const inputs = quizContainer.querySelectorAll('.ui-input input')
    for (const input of inputs) {
      input.addEventListener('change', () => {
        if (input.value !== '') {
          items[currentItem].dataset.quizValidate = ''
          nextButton.classList.remove('ui-button--disabled')
        } else if (items[currentItem].querySelector('[data-quiz-difficult-checkbox]') && (!items[currentItem].querySelector('[data-quiz-difficult-checkbox]').checked)) {
          delete items[currentItem].dataset.quizValidate
          nextButton.classList.add('ui-button--disabled')
        }
      })
    }

    const difficultCheckboxes = quizContainer.querySelectorAll('[data-quiz-difficult-checkbox]')
    for (const checkbox of difficultCheckboxes) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          items[currentItem].dataset.quizValidate = ''
          nextButton.classList.remove('ui-button--disabled')
        } else if (items[currentItem].querySelector('.ui-input input') && (!items[currentItem].querySelector('.ui-input input').value)) {
          delete items[currentItem].dataset.quizValidate
          nextButton.classList.add('ui-button--disabled')
        }
      })
    }

    nextButton.addEventListener('click', function () {
      if (items[currentItem].hasAttribute('data-quiz-validate')) {
        items[currentItem].classList.remove('active')
        currentItem++
        if (currentItem === countItems) {
          actionsWrapper.style.display = 'none'
          passedElement.classList.add('active')

          prizeTitle.textContent = prizeTitle.dataset.finishText
          for (const prize of prizes) {
            prize.classList.add('quiz-prize__img--open')
          }
        } else {
          items[currentItem].classList.add('active')
          backButton.classList.remove('ui-button--hidden')
          if (!items[currentItem].hasAttribute('data-quiz-validate')) nextButton.classList.add('ui-button--disabled')
        }

        progressPercent.textContent = Math.floor(100 / countItems * currentItem)
        progressBar.style.setProperty('--width', `${100 / countItems * currentItem}%`)
      }
    })

    backButton.addEventListener('click', function () {
      items[currentItem].classList.remove('active')
      currentItem--
      items[currentItem].classList.add('active')
      if (currentItem === 0) {
        backButton.classList.add('ui-button--hidden')
      }
      nextButton.classList.remove('ui-button--disabled')

      progressPercent.textContent = Math.floor(100 / countItems * currentItem)
      progressBar.style.setProperty('--width', `${100 / countItems * currentItem}%`)
    })
  }
}

function contactForm() {
  for (const form of document.querySelectorAll('.contact-form')) {
    const radios = form.querySelectorAll('.contact-form__radio input')
    const input = form.querySelector('.contact-form__ui-input input')
    for (const radio of radios) {
      radio.addEventListener('change', (event) => {
        input.placeholder = event.target.dataset.inputPlaceholder
      })
    }
  }
}

function luckyWheel() {
  const element = document.querySelector('.lucky-wheel')
  if (element) {
    let rafId
    let wheelInstance
    const elementWrapper = element.querySelector('.lucky-wheel__wrapper')

    const items = []
    for (const label of element.querySelectorAll('.lucky-wheel__radios label')) {
      items.push({
        label: label.textContent
      })
    }

    const properties = {
      radius: 1,
      borderColor: '#000',
      borderWidth: window.innerWidth < 767 ? 16 : 12,
      itemBackgroundColors: ['#fff', '#1f1f1f'],
      itemLabelColors: ['#000', '#fff'],
      itemLabelFont: 'Montserrat Bold',
      itemLabelFontSizeMax: 20,
      itemLabelRadius: 0.77,
      lineWidth: 0,
      pointerAngle: 90,
      rotationSpeedMax: 350,
      isInteractive: false,
      items: items,
      onSpin: () => {
        rafId = window.requestAnimationFrame(() => updateDots(wheelInstance, elementWrapper))
      },
      onRest: (event) => {
        window.cancelAnimationFrame(rafId)
        element.querySelectorAll('.lucky-wheel__radios input')[event.currentIndex].checked = true
        console.log(event.currentIndex)
      }
    }

    const itemsLength = properties.items.length
    let startAngle = 0
    for (let index = 0; index < itemsLength; index++) {
      const dot = document.createElement('div')
      dot.className = 'lucky-wheel__dot'
      const offset = window.innerWidth < 767 ? 4 : 5
      dot.style.transform = `rotate(${startAngle}deg) translateY(-${(elementWrapper.offsetHeight / 2) - offset}px)`
      elementWrapper.append(dot)
      startAngle += 360 / itemsLength
    }

    wheelInstance = new wheel.Wheel(document.querySelector('.lucky-wheel__wrapper'), properties)

    const spinButton = element.querySelector('[data-spin-wheel]')
    spinButton.addEventListener('click', function (event) {
      event.preventDefault()
      wheelInstance.spin(getRandomInt(200, 350), 0.5)
    })
  }
}

function updateDots(wheelInstance, elementWrapper) {
  const dots = elementWrapper.querySelectorAll('.lucky-wheel__dot')
  let startAngle = 0
  for (const dot of dots) {
    const offset = window.innerWidth < 767 ? 4 : 5
    dot.style.transform = `rotate(${startAngle + wheelInstance._rotation}deg) translateY(-${(elementWrapper.offsetHeight / 2) - offset}px)`
    startAngle += 360 / dots.length
  }
  window.requestAnimationFrame(() => updateDots(wheelInstance, elementWrapper))
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
