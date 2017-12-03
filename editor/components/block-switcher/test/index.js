/**
 * External dependencies
 */
//import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import { BlockSwitcher } from '../';

describe( 'BlockSwitcher', () => {
	test( 'Test block switcher without blocks', () => {
		const tree = renderer
			.create( <BlockSwitcher /> )
			.toJSON();

		expect( tree ).toMatchSnapshot();
	} );
	test( 'Test block switcher with blocks', () => {
		const block = {
			attributes: {
				content: [ 'How are you?' ],
				nodeName: 'H2',
			},
			isValid: true,
			name: 'core/heading',
			originalContent: '<h2>How are you?</h2>',
			uid: 'a1303fd6-3e60-4fff-a770-0e0ea656c5b9',
		};

		const blocks = [
			block,
		];

		const tree = renderer
			.create( <BlockSwitcher blocks={ blocks } /> )
			.toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( 'Test block switcher with multi block of different types.', () => {
		const block1 = {
			attributes: {
				content: [ 'How are you?' ],
				nodeName: 'H2',
			},
			isValid: true,
			name: 'core/heading',
			originalContent: '<h2>How are you?</h2>',
			uid: 'a1303fd6-3e60-4fff-a770-0e0ea656c5b9',
		};

		const block2 = {
			attributes: {
				content: [ 'I am great!' ],
				nodeName: 'P',
			},
			isValid: true,
			name: 'core/text',
			originalContent: '<p>I am great!</p>',
			uid: 'b1303fd6-3e60-4fff-a770-0e0ea656c5b9',
		};

		const blocks = [
			block1,
			block2,
		];

		const tree = renderer
			.create( <BlockSwitcher blocks={ blocks } /> )
			.toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( 'Test block switcher with multi block of same types.', () => {
		const block1 = {
			attributes: {
				content: [ 'How are you?' ],
				nodeName: 'H2',
			},
			isValid: true,
			name: 'core/heading',
			originalContent: '<h2>How are you?</h2>',
			uid: 'a1303fd6-3e60-4fff-a770-0e0ea656c5b9',
		};

		const block2 = {
			attributes: {
				content: [ 'I am great!' ],
				nodeName: 'H3',
			},
			isValid: true,
			name: 'core/heading',
			originalContent: '<h3>I am great!</h3>',
			uid: 'b1303fd6-3e60-4fff-a770-0e0ea656c5b9',
		};

		const blocks = [
			block1,
			block2,
		];

		const tree = renderer
			.create( <BlockSwitcher blocks={ blocks } /> )
			.toJSON();

		expect( tree ).toMatchSnapshot();
	} );
} );
