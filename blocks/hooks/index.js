/**
 * WordPress dependencies
 */
import { createHooks } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import anchor from './anchor';
import customClassName from './custom-class-name';
import customAnchorStyles from './custom-anchor-styles';
import generatedClassName from './generated-class-name';
import matchers from './matchers';

const hooks = createHooks();

const {
	addFilter,
	removeFilter,
	removeAllFilters,
	applyFilters,
	doingFilter,
	didFilter,
	hasFilter,
} = hooks;

export {
	addFilter,
	removeFilter,
	removeAllFilters,
	applyFilters,
	doingFilter,
	didFilter,
	hasFilter,
};

anchor( hooks );
customAnchorStyles( hooks );
customClassName( hooks );
generatedClassName( hooks );
matchers( hooks );
