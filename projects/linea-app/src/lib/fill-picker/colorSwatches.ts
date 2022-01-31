import { hexToHSL, HSLToHex } from './conversion';

/**
 *
 * @param color The hex color string "#RRGGBB"
 */
export function swatches(color: string) {
	const c = Number('0x' + color.slice(1));
	const { h, s, l } = hexToHSL(color);
	const rndSeed = c / 0xffffff;
	const rnd = 1; // Math.round(rndSeed * 5);

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
			return Math.max(0, Math.min(s + delta, 255));
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
		return values.map((delta) => Math.max(0, Math.min(l + delta, 255)));
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
		return values.map((delta) => {
			return (h + delta + 360) % 360;
		});
	};

	const saturationSwatches = saturationValues();
	const lightnessSwatches = lightnessValues();
	const hueSwatches = hueValues();

	// Create an array of {h,s,l} objects
	const hslSwatches: { h: number; s: number; l: number }[] = [];
	for (let i = 0; i < saturationSwatches.length; ++i) {
		hslSwatches.push({
			h: hueSwatches[i],
			s: saturationSwatches[i],
			l: lightnessSwatches[i]
		});
	}

	return hslSwatches.map((hsl) => HSLToHex(hsl));
}
