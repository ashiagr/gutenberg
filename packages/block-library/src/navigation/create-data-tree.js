function createDataTree( dataset, id = 'id', relation = 'parent' ) {
	const hashTable = Object.create( null );
	const dataTree = [];

	dataset.forEach( ( data ) => {
		hashTable[ data[ id ] ] = {
			...data,
			children: [],
		};
	} );

	dataset.forEach( ( data ) => {
		if ( data[ relation ] ) {
			hashTable[ data[ relation ] ].children.push(
				hashTable[ data[ id ] ]
			);
		} else {
			dataTree.push( hashTable[ data[ id ] ] );
		}
	} );
	return dataTree;
}

export default createDataTree;
