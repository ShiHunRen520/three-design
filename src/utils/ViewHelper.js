import { ViewHelper as ViewHelperBase } from './ViewHelperBase.js';

class ViewHelper extends ViewHelperBase {

	constructor( editorCamera, container ) {

		super( editorCamera, container );

		const panel = document.createElement('div');
		panel.style.position = 'absolute';
		panel.style.right = '0px';
		panel.style.bottom = '0px';
		panel.style.width = '128px';
		panel.style.height = '128px';

		panel.addEventListener( 'pointerup', ( event ) => {

			event.stopPropagation();

			this.handleClick( event );

		} );

		panel.addEventListener( 'pointerdown', function ( event ) {

			event.stopPropagation();

		} );

		container.appendChild( panel );

	}

}

export { ViewHelper };
