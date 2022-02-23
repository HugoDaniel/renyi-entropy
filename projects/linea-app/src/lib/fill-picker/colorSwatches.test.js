import { beforeEach, describe, it, expect } from 'vitest';
import { swatches } from './colorSwatches';

describe('Color Swatches', () => {
	it('produces a set of 13 matching colors', () => {
		let startingColor = '#69b9d9';

		const colors = swatches(startingColor);

		// Should produce 13 colors
		expect(colors).toHaveLength(13);
	});

	it('produces a set of hex colors', () => {
		let startingColor = '#69b9d9';

		const colors = swatches(startingColor);

		colors.map((c) => {
			// Hex starts at #
			expect(c[0]).toBe('#');
			// 7 chars:
			expect(c).toHaveLength(7);
		});
	});

	it('produces 13 different colors', () => {
		let startingColor = '#69b9d9';

		const colors = new Set(swatches(startingColor));

		// Sets are unique
		expect(colors.size).toBe(13);
	});
});
