const box = document.querySelectorAll('.status');
const dateLong = (sta) => { return sta.querySelector('.startDate') }
const dateLittle = (sta) => { return sta.querySelector('.startDateLittle')}
resize()

window.addEventListener('resize', () => {
  resize()
})

function resize() {
  if (screen.width < 991) {
    Array.from(box).forEach((sta) => {
      const bars = Array.from(sta.querySelectorAll('.bar'))
      for (let i = 0; i < 30; i++) {
        bars[i].style.display = 'none';
      }
      dateLong(sta).style.display = 'none';
      dateLittle(sta).style.display = 'block';
    })
  }
  if (screen.width >= 991) {
    Array.from(box).forEach((sta) => {
      const bars = Array.from(sta.querySelectorAll('.bar'))
      const date = sta.querySelector('.startDate')
      for (let i = 0; i < 30; i++) {
        bars[i].style.display = 'flex';
      }
      dateLong(sta).style.display = 'block';
      dateLittle(sta).style.display = 'none';
    })
  }
}