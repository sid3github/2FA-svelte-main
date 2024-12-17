<script>
	export let status = 'default';
	export let onClick;
</script>

<button type="button" class="btn {status}" on:click={onClick}>
	<slot />
</button>

<style>
	.btn {
		margin-top: 1rem;
		width: 100%;
		padding: 0.5rem 0;
		border: none;
		border-radius: 0.5rem;
		color: white;
		font-weight: 500;
		transition:
			background-color 0.3s ease,
			transform 0.3s ease;
		cursor: pointer;
		overflow: hidden;
		position: relative;
		background: gray;
	}

	.btn.default {
		background-color: #9ca3af;
	}

	.btn.valid {
		background: linear-gradient(to left, #007bff 50%, #9ba2aa 50%);
		background-size: 200% 100%;
		background-position: right bottom;
		transition:
			background-position 0.8s ease-out,
			color 0.8s ease-out;
		color: #ffffff;
	}

	.btn.invalid {
		background-color: #ef4444;
		animation: shake 0.5s ease-in-out;
	}

	.btn:hover {
		transform: scale(1.02);
	}

	@keyframes fill-from-right {
		from {
			background-size: 0% 100%;
			background-position: 100% 0;
		}
		to {
			background-size: 100% 100%;
			background-position: 0 0;
		}
	}

	@keyframes shake {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		50% {
			transform: translateX(5px);
		}
		75% {
			transform: translateX(-5px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
