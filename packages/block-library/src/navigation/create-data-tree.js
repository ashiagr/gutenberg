function createDataTree( dataset ) {
	const hashTable = Object.create( null );
	const dataTree = [];

	dataset.forEach( ( data ) => {
		hashTable[ data.id ] = {
			...data,
			children: [],
		};
	} );

	dataset.forEach( ( data ) => {
		if ( data.parent ) {
			hashTable[ data.parent ].children.push( hashTable[ data.id ] );
		} else {
			dataTree.push( hashTable[ data.id ] );
		}
	} );
	return dataTree;
}

export default createDataTree;
