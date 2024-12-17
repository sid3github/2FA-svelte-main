<script>
	// import { error } from '@sveltejs/kit';

	export let value = '';
	export let index;
	export let code;
	export let correctCode;
	export let error;
	let inputContaineClass = 'input-container';
	let inputClass = 'input-box';

	function handleInput(event) {
		const input = event.target;
		const isValid = /^\d$/.test(input.value);
		if (isValid) {
			code[index] = input.value;

			inputClass = 'input-box slide-in';
			inputContaineClass = 'input-container filled';

			const parent = input.parentElement;
			const nextSibling = parent.nextElementSibling;
			const nextInput = nextSibling ? nextSibling.querySelector('input') : null;

			if (nextInput) {
				nextInput.focus();
			}
		} else {
			input.value = '';
		}
	}

	function handleKeydown(event) {
		const input = event.target;

		if (event.key === 'Backspace') {
			if (!input.value) {
				const parent = input.parentElement;
				const prevSibling = parent.previousElementSibling;
				const prevInput = prevSibling ? prevSibling.querySelector('input') : null;

				inputClass = 'input-box';
				inputContaineClass = 'input-container';

				if (prevInput) prevInput.focus();
			} else {
				input.value = '';
				code[index] = '';
			}
		} else if (event.key === 'ArrowLeft') {
			const parent = input.parentElement;
			const prevSibling = parent.previousElementSibling;
			const prevInput = prevSibling ? prevSibling.querySelector('input') : null;

			if (prevInput) prevInput.focus();
		} else if (event.key === 'ArrowRight') {
			const parent = input.parentElement;
			const nextSibling = parent.nextElementSibling;
			const nextInput = nextSibling ? nextSibling.querySelector('input') : null;

			if (nextInput) nextInput.focus();
		} else if (event.key === 'c' && event.ctrlKey) {
			event.preventDefault();
			const fullCode = code.join('');
			navigator.clipboard.writeText(fullCode).then(() => {
				console.log('Code copied:', fullCode);
			});
		} else if (event.key === 'x' && event.ctrlKey) {
			event.preventDefault();
			const fullCode = code.join('');
			navigator.clipboard.writeText(fullCode).then(() => {
				console.log('Code cut:', fullCode);
			});
			code.forEach((_, i) => (code[i] = ''));
			const inputs = Array.from(input.parentElement.parentElement.querySelectorAll('input'));
			inputs.forEach((input) => (input.value = ''));
			inputs[0].focus();
		}
	}

	function handlePaste(event) {
		event.preventDefault();
		const clipboardData = event.clipboardData.getData('text');

		if (/^\d{6}$/.test(clipboardData)) {
			const inputs = Array.from(
				event.target.closest('.input-container-parent').querySelectorAll('input')
			);

			for (let i = 0; i < clipboardData.length; i++) {
				if (inputs[i]) {
					code[i] = clipboardData[i];
					inputs[i].value = clipboardData[i];
				}
			}
			inputs[Math.min(clipboardData.length, inputs.length) - 1].focus();
		}
	}

	function validateCode() {
		console.log(error);

		if (error === 'locked') {
			let elemnts = document.getElementsByClassName('input-container');

			for (let item of elemnts) {
				item.classList.add('locked');
			}
		} else if (error === 'default') {
			let elemnts = document.getElementsByClassName('input-container');

			for (let item of elemnts) {
				item.classList.remove('locked');
			}
		}
	}
</script>

<div class={inputContaineClass}>
	<input
		type="text"
		maxlength="1"
		bind:value
		class={inputClass}
		on:input={handleInput}
		on:keydown={handleKeydown}
		on:paste={handlePaste}
		on:keyup={validateCode}
	/>
	<span class="underline"></span>
</div>

<style>
	:root {
		--primary-blue: #b9dff9;
		--secodary-blue: #4cc9fe;
		--primary-red: #ff748b;
		--secodary-red: #f72c5b;
	}

	.input-container {
		position: relative;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		padding: 8px;
		overflow: hidden;
	}

	.input-container.filled {
		border: 2px solid var(--primary-blue);
	}

	.input-container:focus-within {
		border: 2px solid var(--primary-blue);
	}

	.input-container.locked {
		border: 2px solid var(--primary-red);
	}

	.input-box {
		/* position: ; */
		position: relative;
		width: 3rem;
		height: 3rem;
		text-align: center;
		outline: none;
		transition: all 0.3s ease;
		background: none;
		opacity: 1;
	}

	@keyframes slideInFromTop {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.input-box.slide-in {
		animation: slideInFromTop 0.8s ease;
	}

	.input-box:focus + .underline {
		border-bottom: 2px solid var(--primary-blue);
	}

	.underline {
		width: 100%;
		width: 100%;
		height: 2px;
		background-color: var(--primary-blue);
		transform: translateY(20px);
		transition: transform 0.4s ease-in-out;
		opacity: 0;
	}

	.input-box:focus + .underline {
		transform: translateY(0);
		opacity: 1;
	}
</style>
