/**
 * WordPress dependencies
 */
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { useDispatch, useSelect } from '@wordpress/data';
import deprecated from '@wordpress/deprecated';
import { BlockEditorKeyboardShortcuts } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SaveShortcut from './save-shortcut';

function VisualEditorGlobalKeyboardShortcuts() {
	const { redo, undo, savePost } = useDispatch( 'core/editor' );
	const isEditedPostDirty = useSelect(
		( select ) => select( 'core/editor' ).isEditedPostDirty,
		[]
	);
	const ref = useRef();

	useShortcut(
		'core/editor/undo',
		( event ) => {
			undo();
			event.preventDefault();
		},
		{ bindGlobal: true, target: () => ref.current.ownerDocument }
	);

	useShortcut(
		'core/editor/redo',
		( event ) => {
			redo();
			event.preventDefault();
		},
		{ bindGlobal: true, target: () => ref.current.ownerDocument }
	);

	useShortcut(
		'core/editor/save',
		( event ) => {
			event.preventDefault();

			// TODO: This should be handled in the `savePost` effect in
			// considering `isSaveable`. See note on `isEditedPostSaveable`
			// selector about dirtiness and meta-boxes.
			//
			// See: `isEditedPostSaveable`
			if ( ! isEditedPostDirty() ) {
				return;
			}

			savePost();
		},
		{ bindGlobal: true, target: () => ref.current.ownerDocument }
	);

	return (
		<div ref={ ref }>
			<BlockEditorKeyboardShortcuts />
			<SaveShortcut />
		</div>
	);
}

export default VisualEditorGlobalKeyboardShortcuts;

export function EditorGlobalKeyboardShortcuts() {
	deprecated( 'EditorGlobalKeyboardShortcuts', {
		alternative: 'VisualEditorGlobalKeyboardShortcuts',
		plugin: 'Gutenberg',
	} );

	return <VisualEditorGlobalKeyboardShortcuts />;
}
