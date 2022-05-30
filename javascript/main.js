/* CONSUME JSON FILE */

fetch('./json/data.json')
  .then((response) => {
    return response.json()
  })
  .then((jsondata) => {
    let week = getTodayBar()
    createBars(jsondata, week)

    /* SHOW AMOUNT WHEN HOVER */
    document.querySelectorAll('.bar').forEach((bar, index) => {
      bar.addEventListener('mouseover', () => {
        showAmount(jsondata, index)
      })
    })

    document.querySelectorAll('.bar').forEach((bar, index) => {
      bar.addEventListener('mouseout', () => {
        hideAmount(index)
      })
    })
  })

/* Show amount */
function showAmount(data, index) {
  const priceTag = createPriceTag(data, index)
  document.querySelectorAll('.bar')[index].appendChild(priceTag)
}

/* Hide amount */
function hideAmount(index) {
  const price = document.querySelector('.price')
  document.querySelectorAll('.bar')[index].removeChild(price)
}

/* create price element */

function createPriceTag(price, index) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const div = document.createElement('div')
  div.classList.add('price')
  div.innerText = formatter.format(price[index].amount)

  return div
}

/* show today's bar */

function getTodayBar() {
  let date = new Date()
  let todayWeek = ''
  if (date.getDay() == 0) {
    todayWeek = 'sun'
  } else if (date.getDay() == 1) {
    todayWeek = 'mon'
  } else if (date.getDay() == 2) {
    todayWeek = 'tue'
  } else if (date.getDay() == 3) {
    todayWeek = 'wed'
  } else if (date.getDay() == 4) {
    todayWeek = 'thu'
  } else if (date.getDay() == 5) {
    todayWeek = 'fri'
  } else if (date.getDay() == 6) {
    todayWeek = 'sat'
  }
  return todayWeek
}

/* DEFINE BARS HEIGHT */
function createBars(data, week) {
  const bars = document.querySelectorAll('.bar')
  const dataHeight = document.querySelector('.data')

  bars.forEach((bar, index) => {
    let barHeight = data[index].amount * 2
    if (barHeight >= dataHeight.clientHeight)
      barHeight = dataHeight.clientHeight

    let rest = dataHeight.clientHeight - barHeight
    bar.style.height = `${barHeight}px`
    bar.style.marginTop = `${rest}px`

    if (data[index].day == week) {
      bar.style.backgroundColor = 'var(--cyan)'
    }
  })
}
