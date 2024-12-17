<script>
	import InputCode from '$lib/components/InputCode.svelte';
	import Lock from '$lib/components/Lock.svelte';
	import SubmitButton from '$lib/components/SubmitButton.svelte';

	let code = ['', '', '', '', '', ''];
	let error = '';

	const correctCode = '123456';

	$: digitsLeft = code.filter((digit) => digit === '').length;

	$: inputStatus =
		digitsLeft === 0 ? (code.join('') === correctCode ? 'unlocked' : 'locked') : 'default';

	$: buttonStatus =
		digitsLeft > 0 ? 'default' : code.join('') === correctCode ? 'valid' : 'invalid';

	$: lockStatus =
		digitsLeft === 0 ? (code.join('') === correctCode ? 'unlocked' : 'locked') : 'default';

	function handleSubmit() {
		if (code.join('') === correctCode) {
			error = '';
		} else {
			error = 'Wrong Code';
		}
	}
</script>

<div class="mx-auto bg-primary-white p-12 rounded-xl shadow-lg">
	<!-- Lock Component -->
	<Lock status={lockStatus} />

	<!-- Header -->
	<h1 class="text-4xl font-bold text-center mb-6 text-primary-black">Easy peasy</h1>
	<h4 class="text-center mb-6 text-primary-grey">
		Enter 6-digit code from your two factor authenticator APP.
	</h4>

	<!-- Input Fields -->
	<div class="flex justify-between gap-2">
		{#each code as digit, index}
			<InputCode bind:value={code[index]} {index} {code} error={inputStatus} />
		{/each}
	</div>

	<!-- Error Message -->
	{#if error}
		<p class="text-red-500 text-sm mt-4">{error}</p>
	{/if}

	<!-- Submit Button -->
	<SubmitButton status={buttonStatus} on:click={handleSubmit}>
		{digitsLeft === 0
			? code.join('') === correctCode
				? 'Verify Code'
				: 'Wrong Code'
			: `${digitsLeft} digit${digitsLeft > 1 ? 's' : ''} left`}
	</SubmitButton>
</div>
