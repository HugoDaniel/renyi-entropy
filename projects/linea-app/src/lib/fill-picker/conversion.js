/**
 * Converts hex color to HSL
 *
 * @param {string} H - The hex color string either in the format of '#RRGGBB' or '#RGB'
 * @returns {{ h: number, s: number, l: number }} - The HSL object, where s and l
 * are percentages.
 */
export function hexToHSL(H) {
	// Convert hex to RGB first
	let r = 0,
		g = 0,
		b = 0;
	if (H.length == 4) {
		r = Number('0x' + H[1] + H[1]);
		g = Number('0x' + H[2] + H[2]);
		b = Number('0x' + H[3] + H[3]);
	} else if (H.length == 7) {
		r = Number('0x' + H[1] + H[2]);
		g = Number('0x' + H[3] + H[4]);
		b = Number('0x' + H[5] + H[6]);
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return {
		h,
		s,
		l
	};
}

/**
 * Converts HSL color to its Hex string
 *
 * @param {{ h: number; s: number; l: number }} hsl - An object with the hue,
 * saturation and lightness values
 * @returns {string} The hex string in the format of '#RRGGBB'
 */
export function HSLToHex(hsl) {
	let { h, s, l } = hsl;
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Converts a hex color string in the format '#RRGGBB' to the rgb string in
 * the format 'rgb(255, 255, 255)'.
 *
 * @param {string} hex - The hex string `#RRGGBB`
 * @returns {string} The `rgb(number, number, number)` string
 */
export function HexToRGB(hex) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return `rgb(${r}, ${g}, ${b})`;
}
