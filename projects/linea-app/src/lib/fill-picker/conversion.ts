/**
 * Converts hex color to HSL
 * @param H The hex color string either in the format of '#RRGGBB' or '#RGB'
 * @returns An object with { h: number, s: number, l: number }, where s and l
 * are percentages.
 */
export function hexToHSL(H: string) {
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

	//return 'hsl(' + h + ',' + s + '%,' + l + '%)';
	return {
		h,
		s,
		l
	};
}

/**
 * Converts HSL color to its Hex string
 * @param hsl An object with the hue, saturation and lightness values
 * @returns The hex string in the format of '#RRGGBB'
 */
export function HSLToHex(hsl: { h: number; s: number; l: number }) {
	let { h, s, l } = hsl;
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (300 <= h && h < 360) {
		r = c;
		g = 0;
		b = x;
	}
	// Having obtained RGB, convert channels to hex
	let rs = Math.round((r + m) * 255).toString(16);
	let gs = Math.round((g + m) * 255).toString(16);
	let bs = Math.round((b + m) * 255).toString(16);

	// Prepend 0s, if necessary
	if (rs.length == 1) rs = '0' + rs;
	if (gs.length == 1) gs = '0' + gs;
	if (bs.length == 1) bs = '0' + bs;

	return '#' + rs + gs + bs;
}
