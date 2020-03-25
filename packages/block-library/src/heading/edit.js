/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import HeadingToolbar from './heading-toolbar';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import {
	AlignmentToolbar,
	BlockControls,
	RichText,
	__experimentalUseColors,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';

function HeadingEdit( { attributes, setAttributes, mergeBlocks, onReplace } ) {
	const ref = useRef();
	const { TextColor, InspectorControlsColorPanel } = __experimentalUseColors(
		[ { name: 'textColor', property: 'color' } ],
		{
			contrastCheckers: { backgroundColor: true, textColor: true },
			colorDetector: { targetRef: ref },
		},
		[]
	);

	const { align, content, level, placeholder } = attributes;
	const tagName = 'h' + level;

	return (
		<>
			<BlockControls>
				<HeadingToolbar
					minLevel={ 1 }
					maxLevel={ 7 }
					selectedLevel={ level }
					onChange={ ( newLevel ) =>
						setAttributes( { level: newLevel } )
					}
				/>
				<AlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
			</BlockControls>
			{ InspectorControlsColorPanel }
			<TextColor>
				<RichText
					ref={ ref }
					identifier="content"
					tagName={ Block[ tagName ] }
					value={ content }
					onChange={ ( value ) =>
						setAttributes( { content: value } )
					}
					onMerge={ mergeBlocks }
					onSplit={ ( value ) => {
						if ( ! value ) {
							return createBlock( 'core/paragraph' );
						}

						return createBlock( 'core/heading', {
							...attributes,
							content: value,
						} );
					} }
					onReplace={ onReplace }
					onRemove={ () => onReplace( [] ) }
					className={ classnames( {
						[ `has-text-align-${ align }` ]: align,
					} ) }
					placeholder={ placeholder || __( 'Write heading…' ) }
					textAlign={ align }
				/>
			</TextColor>
		</>
	);
}

export default HeadingEdit;
