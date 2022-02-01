import { hexToHSL, HSLToHex } from './conversion';

/**
 * This function returns an array of color strings where each color has a
 * relation with the input color.
 *
 * @param {string} color The hex color string "#RRGGBB"
 * @param {number} at The position of the color in the swatches
 * @returns {string[]} An array of hex color strings.
 */
export function swatches(color, at = 6) {
	const c = Number('0x' + color.slice(1));
	const { h, s, l } = hexToHSL(color);
	const rndSeed = c / 0xffffff;
	const rnd = Math.round(rndSeed * 5);

	const saturationValues = () => {
		const A = rnd;
		const B = -10 - A;
		const C = B * 2;
		const D = Math.round((B * 3) / 2);
		const E = Math.round(D / 2) - A;
		const F = -E * 3 + A;
		const G = Math.round(F / 2 + A);

		const values = [-B, E, C, -D + A, C, E * 4, 0, G, D - A, B, G, F, A];
		return values.map((delta) => {
			let saturation = s + delta;
			let limit = 100;
			do {
				if (saturation > limit || saturation < 0) {
					delta /= 2;
					saturation = l + delta;
				}
			} while (saturation > 100 || saturation < 0);
			return Math.round(Math.max(0, Math.min(saturation, 100)));
		});
	};

	const lightnessValues = () => {
		const A = rnd;
		const B = 10;
		const C = Math.round(-B / 2);
		const D = 2 * B + 2 * A;
		const E = Math.round(D / 2 + A);
		const F = -E - C - A;

		const values = [B, C, E, D, -D - A, F, 0, B - C, B * 2 - C, -B * 2, A, D + F, -A];
		console.log(`LIGHT[0]: ${values[0]}; LIGHT[2]: ${values[2]}`);
		return values.map((delta) => {
			let light = l + delta;
			let limit = 100;
			do {
				if (light > limit || light < 0) {
					delta /= 2;
					light = l + delta;
				}
			} while (light > 100 || light < 0);
			return Math.round(Math.max(0, Math.min(light, 100)));
		});
	};

	const hueValues = () => {
		const A = rnd;
		const B = -118;
		const C = 34;
		const D = Math.round(B / 2 - A);
		const E = Math.round(-D / 4 - A);
		// Round some math, these values are derived from the ones above:
		const F = Math.round(C + (C - A) / 3);
		const G = Math.round(C + D / 2);
		const H = Math.round(C / 2 + A);

		const values = [
			B,
			B + Math.round(E / 2),
			-E * 3 - A,
			0,
			B + Math.round(E / 2) - A,
			D,
			0,
			E,
			F,
			G,
			H,
			C,
			C
		];
		console.log(`HUE[0]: ${values[0]}; HUE[2]: ${values[2]}`);
		return values.map((delta) => {
			return (h + delta + 360) % 360;
		});
	};

	const saturationSwatches = saturationValues();
	const lightnessSwatches = lightnessValues();
	const hueSwatches = hueValues();

	/**
	 * An array of colors (defined by their hex string)
	 * @type string[]
	 */
	const hslSwatches = [];
	for (let i = 0; i < saturationSwatches.length; ++i) {
		hslSwatches[i] = HSLToHex({
			h: hueSwatches[i],
			s: saturationSwatches[i],
			l: lightnessSwatches[i]
		});
	}
	const hsl0 = {
		h: hueSwatches[0],
		s: saturationSwatches[0],
		l: lightnessSwatches[0]
	};
	const hsl1 = {
		h: hueSwatches[2],
		s: saturationSwatches[2],
		l: lightnessSwatches[2]
	};
	const hslcurrent = {
		h: hueSwatches[6],
		s: saturationSwatches[6],
		l: lightnessSwatches[6]
	};
	console.log('C[0]: ', hslSwatches[0], ', C[2]: ', hslSwatches[2]);
	console.log('CURRENT:', hslcurrent, '0:', hsl0, '1:', hsl1);

	return hslSwatches;
}
