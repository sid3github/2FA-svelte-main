export function validateCode(code) {
	return /^\d{6}$/.test(code); // Check if the code has exactly 6 digits
}
