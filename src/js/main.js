const mobileMenu = () => {
	const menu = document.querySelector('nav.menu.main ul'),
		hamburger = document.querySelector('nav.menu.main button.hamburger')

	if (document.querySelectorAll('nav.menu.main ul.active').length < 1) {
		menu.classList.add('active')
		hamburger.classList.add('active')
	} else {
		menu.classList.remove('active')
		hamburger.classList.remove('active')
	}
}

document
	.querySelectorAll(
		'.wpforms-field-email input, .wpforms-field-text input, .wpforms-field-textarea textarea',
	)
	.forEach(i => {
		i.addEventListener('input', e => {
			console.log(e.target.value)

			if (e.target.value !== '') {
				e.target.parentElement.querySelector('label').classList.add('filled')
			}
		})
	})
