const box = document.querySelectorAll('.status');
resize()

window.addEventListener('resize', () => {
  resize()
})

function resize() {
  if (window.innerWidth < 991) {
    Array.from(box).forEach((sta) => {
      const bars = Array.from(sta.querySelectorAll('.bar'))
      const date = sta.querySelector('.startDate')
      for (let i = 0; i < 30; i++) {
        bars[i].style.display = 'none';
      }
      date.innerHTML = 'Il y a 30 jours';
    })
  }
  if (window.innerWidth >= 991) {
    Array.from(box).forEach((sta) => {
      const bars = Array.from(sta.querySelectorAll('.bar'))
      const date = sta.querySelector('.startDate')
      for (let i = 0; i < 30; i++) {
        bars[i].style.display = 'flex';
      }
      date.innerHTML = 'Il y a 60 jours';
    })
  }
}