/**
 * External dependency
 */
import classnames from 'classnames';
import { connect } from 'react-redux';

/**
 * WordPress dependency
 */
import { BlockEdit, getBlockDefaultClassname, getBlockType, hasBlockSupport } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { getWrapperDisplayName } from '@wordpress/element';

/**
 * Internal dependency
 */
import './style.scss';
// TODO: Move selectors to the local folder
import {
	getBlock,
	getFrozenBlockCollaboratorColor,
	getFrozenBlockCollaboratorName,
	isBlockFrozenByCollaborator,
} from '../../editor/selectors';

const withFrozenMode = ( OriginalComponent, originalProps ) => {
	const Component = ( { isFrozenByCollaborator, ...props } ) => {
		if ( isFrozenByCollaborator ) {
			const { block, collaboratorColor, collaboratorName } = props;
			const { attributes, name, isValid, uid } = block;
			const blockType = getBlockType( name );

			// Determine whether the block has props to apply to the wrapper.
			let wrapperProps;
			if ( blockType.getEditWrapperProps ) {
				wrapperProps = blockType.getEditWrapperProps( attributes );
			}

			// Generate a class name for the block's editable form
			const generatedClassName = hasBlockSupport( blockType, 'className', true ) ?
				getBlockDefaultClassname( block.name ) :
				null;
			const className = classnames( generatedClassName, block.attributes.className );

			return (
				<div
					className={ `editor-block-list__block is-frozen-by-collaborator is-${ collaboratorColor }` }
					{ ...wrapperProps }
				>
					<legend className="coediting-legend">{ collaboratorName }</legend>
					<div className="editor-block-list__block-edit">
						{ isValid && <BlockEdit
							attributes={ attributes }
							className={ className }
							id={ uid }
							name={ name }
						/> }
					</div>
				</div>
			);
		}

		return <OriginalComponent { ...originalProps } />;
	};
	Component.displayName = getWrapperDisplayName( OriginalComponent, 'frozen-mode' );

	const mapStateToProps = ( state, { uid } ) => ( {
		block: getBlock( state, uid ),
		collaboratorColor: getFrozenBlockCollaboratorColor( state, uid ),
		collaboratorName: getFrozenBlockCollaboratorName( state, uid ),
		isFrozenByCollaborator: isBlockFrozenByCollaborator( state, uid ),
	} );

	return connect( mapStateToProps )( Component );
};

addFilter( 'Editor.BlockItem', 'coediting/block-item/frozen-mode', withFrozenMode );
