/**
 * WordPress dependencies
 */
import {
	PostTitle,
	VisualEditorGlobalKeyboardShortcuts,
} from '@wordpress/editor';
import {
	WritingFlow,
	Typewriter,
	ObserveTyping,
	BlockList,
	CopyHandler,
	BlockSelectionClearer,
	MultiSelectScrollIntoView,
	__experimentalBlockSettingsMenuFirstItem,
} from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';
import { useState, useEffect, createPortal } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockInspectorButton from './block-inspector-button';
import { useResizeCanvas } from '../resize-canvas';

export const IFrame = ( { children, ...props } ) => {
	const [ contentRef, setContentRef ] = useState();
	const doc = contentRef && contentRef.contentWindow.document;

	useEffect( () => {
		if ( doc ) {
			doc.body.style.margin = '0px';
			doc.head.appendChild(
				document.getElementById( 'wp-block-editor-css' ).cloneNode()
			);
			doc.head.appendChild(
				document.getElementById( 'wp-block-library-css' ).cloneNode()
			);
			doc.head.appendChild(
				document.getElementById( 'wp-edit-blocks-css' ).cloneNode()
			);
			doc.head.appendChild(
				document
					.getElementById( 'twentytwenty-block-editor-styles-css' )
					.cloneNode()
			);
			doc.head.appendChild(
				document.getElementById( 'wp-components-css' ).cloneNode()
			);
		}
	}, [ doc ] );

	return (
		// eslint-disable-next-line jsx-a11y/iframe-has-title
		<iframe { ...props } ref={ setContentRef }>
			{ doc && createPortal( children, doc.body ) }
		</iframe>
	);
};

function VisualEditor() {
	const inlineStyles = useResizeCanvas();

	return (
		<>
			<Popover.Slot name="block-toolbar" />
			<IFrame className="edit-post-visual-editor">
				<BlockSelectionClearer
					className="editor-styles-wrapper"
					style={ inlineStyles }
				>
					<VisualEditorGlobalKeyboardShortcuts />
					<MultiSelectScrollIntoView />
					<Typewriter>
						<CopyHandler>
							<WritingFlow>
								<ObserveTyping>
									<CopyHandler>
										<PostTitle />
										<BlockList />
									</CopyHandler>
								</ObserveTyping>
							</WritingFlow>
						</CopyHandler>
					</Typewriter>
					<__experimentalBlockSettingsMenuFirstItem>
						{ ( { onClose } ) => (
							<BlockInspectorButton onClick={ onClose } />
						) }
					</__experimentalBlockSettingsMenuFirstItem>
				</BlockSelectionClearer>
			</IFrame>
		</>
	);
}

export default VisualEditor;
