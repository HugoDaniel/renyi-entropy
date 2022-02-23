import { hexToHSL, HSLToHex } from './conversion';

/**
 * This function returns an array of color strings where each color has a
 * relation with the input color.
 *
 * @param {string} color The hex color string "#RRGGBB"
 * @returns {string[]} An array of hex color strings.
 */
export function swatches(color) {
	const c = Number('0x' + color.slice(1));
	const { h, s, l } = hexToHSL(color);
	const rndSeed = c / 0xffffff;
	const rnd = Math.round(rndSeed * 5);

	const isGray =
		color[1] === color[3] &&
		color[3] === color[5] &&
		color[2] === color[4] &&
		color[4] === color[6];

	/**
	 * Gets a distance (in number) from the current color and its closest gray
	 * @returns number A distance from the current color and its gray
	 */
	const grayDist = () => {
		// To get the closest gray, the current color saturation is set to 0
		const grayHex = HSLToHex({ h, s: 0, l });
		const gray = Number('0x' + grayHex.slice(1));
		// Decompose the closest gray into RGB number values
		const rGray = (gray >> 16) & 0x0000ff;
		const gGray = (gray >> 8) & 0x0000ff;
		const bGray = gray & 0x0000ff;
		// Decompose the current color into RGB number values
		const r = (c >> 16) & 0x0000ff;
		const g = (c >> 8) & 0x0000ff;
		const b = c & 0x0000ff;
		// Return their absolute difference.
		return Math.abs(rGray - r) + Math.abs(gGray - g) + Math.abs(bGray - b);
	};

	const saturationValues = () => {
		// The sat amount to represent
		const range = Math.min(64, grayDist()) + 1;
		let weakest = 0;
		let strongest = 100;
		let rangeRatio = 0.5;
		if (s >= 50) {
			const distanceToMax = 100 - s;
			rangeRatio = Math.min(1 / (range / distanceToMax) - 0.1, rangeRatio);
			strongest = Math.min(s + range * rangeRatio, 100);
			weakest = s - range / 2;
		} else {
			const distanceToMin = s;
			rangeRatio = Math.min(1 - distanceToMin / range - 0.1, rangeRatio);
			strongest = Math.max(s - range * rangeRatio, 0);
			weakest = s + range / 2;
		}
		const increment = (strongest - weakest) / 5;
		let rightValue = weakest + Math.abs((weakest + increment - (strongest - increment * 3)) / 2);
		let leftValue = Math.abs((strongest - increment + (weakest + increment * 3)) / 2);
		rightValue = rightValue > strongest - increment * 4 ? strongest : rightValue;
		leftValue = leftValue < weakest + increment * 4 ? weakest + increment * 4 : leftValue;

		const values2 = [
			weakest,
			weakest + increment * 2,
			weakest + increment * 1,
			rightValue,
			weakest + increment * 4,
			weakest + increment * 3,
			s,
			strongest - increment * 3,
			strongest - increment * 4,
			leftValue,
			strongest - increment * 1,
			strongest - increment * 2,
			strongest
		];

		const values = [
			weakest + increment * 1,
			rightValue,
			weakest,
			weakest + increment * 3,
			weakest + increment * 4,
			weakest + increment * 2,
			s,
			strongest - increment * 2,
			strongest - increment * 4,
			strongest - increment * 3,
			strongest,
			leftValue,
			strongest - increment * 1
		];
		return values;
	};

	const lightnessValues = () => {
		// The amount of light represented throughout the colors in the palette
		let range = isGray ? 64 : Math.min(50, grayDist()) + 1;
		let darkest = 0;
		let lightest = 100;

		let rangeRatio = 0.5;
		if (l >= 50) {
			const distanceToMax = 100 - l;
			rangeRatio = Math.min(1 / (range / distanceToMax) - 0.1, rangeRatio);
			lightest = Math.min(l + range * rangeRatio, 100);
			darkest = l - range / 2;
		} else {
			const distanceToMin = l;
			rangeRatio = Math.min(1 - distanceToMin / range - 0.1, rangeRatio);
			darkest = Math.max(l - range * rangeRatio, 0);
			lightest = l + range / 2;
		}
		const increment = (lightest - darkest) / 5;
		let rightValue = darkest + Math.abs((darkest + increment - (lightest - increment * 3)) / 2);
		let leftValue = Math.abs((lightest - increment + (darkest + increment * 3)) / 2);
		rightValue = rightValue > lightest - increment * 4 ? lightest : rightValue;
		leftValue = leftValue < darkest + increment * 4 ? darkest + increment * 4 : leftValue;

		const values = [
			darkest,
			darkest + increment * 2,
			darkest + increment * 1,
			rightValue,
			darkest + increment * 4,
			darkest + increment * 3,
			l,
			lightest - increment * 3,
			lightest - increment * 4,
			leftValue,
			lightest - increment * 1,
			lightest - increment * 2,
			lightest
		];
		return values;
	};

	const hueValues = () => {
		const A = rnd;
		const B = -118 - rnd;
		const C = 34 + rnd;
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

	return hslSwatches;
}
