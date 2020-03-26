/**
 * External dependencies
 */
import { range } from 'lodash';

/**
 * WordPress dependencies
 */
import { Toolbar, ToolbarGroup } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import HeadingLevelIcon from './heading-level-icon';

const POPOVER_PROPS = {
	className: 'block-editor-heading-level-toolbar',
	position: 'bottom right',
};

function createLevelControl( targetLevel, selectedLevel, onChange ) {
	const isActive = targetLevel === selectedLevel;
	return {
		icon: <HeadingLevelIcon level={ targetLevel } isPressed={ isActive } />,
		// translators: %s: heading level e.g: "1", "2", "3"
		title: sprintf( __( 'Heading %d' ), targetLevel ),
		isActive,
		onClick: () => onChange( targetLevel ),
	};
}

/**
 * Object containing a WordPress Element component.
 *
 * @typedef {import('@wordpress/element').WPComponent} WPComponent
 */

/**
 * HeadingLevelToolbar props
 *
 * @typedef WPHeadingLevelToolbarProps
 *
 * @property {boolean} [isCollapsed]  Whether or not the toolbar is collapsed.
 * @property {number} [minLevel]      The minimum heading level (inclusive).
 * @property {number} [maxLevel]      The maximum heading level (inclusive).
 * @property {number} selectedLevel   The chosen heading level.
 * @property {Function} onChange      Callback to run when toolbar value is changed.
 */

/**
 * A toolbar for selecting a heading level (1 through 6).
 *
 * @param {WPHeadingLevelToolbarProps} props Component props.
 *
 * @return {WPComponent} The toolbar.
 */
export default function HeadingLevelToolbar( props ) {
	const {
		isCollapsed = true,
		minLevel = 1,
		maxLevel = 6,
		selectedLevel,
		onChange,
	} = props;

	return (
		<Toolbar
			isCollapsed={ isCollapsed }
			icon={ <HeadingLevelIcon level={ selectedLevel } /> }
			label={ __( 'Change heading level' ) }
			popoverProps={ POPOVER_PROPS }
		>
			{ () => (
				<ToolbarGroup
					isCollapsed={ false }
					icon={ <HeadingLevelIcon level={ selectedLevel } /> }
					controls={ range( minLevel, maxLevel + 1 ).map( ( index ) =>
						createLevelControl( index, selectedLevel, onChange )
					) }
					label={ __( 'Change heading level' ) }
				/>
			) }
		</Toolbar>
	);
}
