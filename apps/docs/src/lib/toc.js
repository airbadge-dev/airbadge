import { afterNavigate } from '$app/navigation'

export function syncToc(tocSelector) {
  let observer

  afterNavigate(() => {
    const toc = document.querySelector(tocSelector)

    if (observer) observer.disconnect()

    observer = new IntersectionObserver((entries) => {
      entries.reverse().forEach((entry) => {
        if (entry.intersectionRatio == 0) return

        toc.querySelectorAll('a').forEach((element) => {
          element.classList.remove('active')
        })

        toc.querySelector(`a[href='#${entry.target.id}']`)
          .classList
          .add('active')
      })
    })

    document
      .querySelectorAll(':is(h1, h2)[id]')
      .forEach((element) => observer.observe(element))
  })
}
