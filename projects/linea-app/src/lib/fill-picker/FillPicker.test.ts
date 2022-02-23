import { beforeEach, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import FillPicker from './FillPicker.svelte';

beforeEach(cleanup);

it('can render', () => {
	render(FillPicker);
});

it('has a title that prompts action', () => {
	const { getByText } = render(FillPicker);
	expect(getByText('Change color')).toBeDefined();
});

it('starts with the #69b9d9 color', () => {
	const { getByText } = render(FillPicker);
	expect(getByText('#69b9d9')).toBeDefined();
});
