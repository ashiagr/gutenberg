/**
 * WordPress dependencies
 */
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { useDispatch, useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';

function SaveShortcut() {
	const { savePost } = useDispatch( 'core/editor' );
	const isEditedPostDirty = useSelect(
		( select ) => select( 'core/editor' ).isEditedPostDirty,
		[]
	);
	const ref = useRef();

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

	return <div ref={ ref } />;
}

export default SaveShortcut;
