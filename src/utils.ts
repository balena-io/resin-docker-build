
/**
 * Given a docker 'arrow message' containing a sha representing
 * a layer, extract the sha digest. If the string passed in is not
 * an arrow message, undefined will be returned.
 *
 * @param {string} message
 *	The build message to parse
 * @returns {string}
 *	Either the sha string, or undefined
 */
export function extractLayer(message: string) : string | undefined {
	let extract : string | undefined;
	if((extract = extractArrowMessage(message)) != undefined) {
		let shaRegex = /([a-f0-9]{12}[a-f0-9]*)/g;
		let match;
		if(match = shaRegex.exec(extract)) {
			return match[1];
		}
	}

	return undefined;
}

function extractArrowMessage(message: string) : string | undefined {
	let arrowTest = /^\s*-+>\s*(.+)/i;
	let match;
	if (match = arrowTest.exec(message))
		return match[1];
	else
		return undefined;
}