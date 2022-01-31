import { beforeEach, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import FillPicker from './FillPicker.svelte';

beforeEach(cleanup);

it('can render', () => {
	render(FillPicker);
});

it('has a title that prompts action', () => {
	const { getByText } = render(FillPicker);
	expect(getByText('Fill the shape with')).toBeDefined();
});
