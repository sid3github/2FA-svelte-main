<script>
	export let status = 'locked';
	console.log(status);
</script>

<div class="lock-container {status}">
	<div class="lock {status}"></div>
</div>

<style>
	:root {
		--default-color: #b9dff9;
		--default-color-secodary: #4cc9fe;
		--locked-color: #ff748b;
		--locked-color-secodary: #f72c5b;
		--unlocked-color: #e4f1ac;
		--unlocked-color-secodary: #a7d477;
	}

	.lock-container {
		width: 100px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--default-color);
		border-radius: 100px;
		margin: 20px auto;
		padding: 10px;
		transition: background-color 0.3s ease-in-out;
	}

	.lock-container.unlocked {
		background-color: var(--unlocked-color);
	}

	.lock-container.locked {
		background-color: var(--locked-color);
	}

	.lock-container.unlocked,
	.lock-container.locked {
		animation: scale 1s;
	}

	@keyframes scale {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}

	.lock {
		width: 30px;
		height: 30px;
		border: 3px solid var(--default-color-secodary);
		border-radius: 100px;
		position: relative;
		cursor: pointer;
		transition: all 0.4s ease-in-out;
		margin-top: 6px;
	}

	.lock:after {
		content: '';
		display: block;
		background: var(--default-color-secodary);
		width: 3px;
		height: 7px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -3.5px 0 0 -2px;
		transition: all 0.4s ease-in-out;
	}

	.lock:before {
		content: '';
		display: block;
		width: 16px;
		height: 14px;
		bottom: 100%;
		position: absolute;
		left: 50%;
		margin-left: -8px;
		border: 3px solid var(--default-color-secodary);
		border-top-right-radius: 50%;
		border-top-left-radius: 50%;
		border-bottom: 0;
	}

	.lock.unlocked:before {
		left: 100%;
		transform: rotateY(180deg);
		transition: all 0.4s ease-in-out;
	}

	.lock.unlocked,
	.lock.unlocked:before {
		border-color: var(--unlocked-color-secodary);
	}

	.lock.unlocked:after {
		background: var(--unlocked-color-secodary);
	}

	.lock.locked,
	.lock.locked:before {
		border-color: var(--locked-color-secodary);
	}

	.lock.locked:after {
		background: var(--locked-color-secodary);
	}
</style>
