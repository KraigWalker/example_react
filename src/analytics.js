/**
 * 
 * 
 * @param {any} action 
 * @param {any} id 
 * @param {any} position 
 * @returns 
 */
function analytics(action, id, position) {
	try {
		let time = new Date().getTime().toISOString();
		const campaign = JSON.parse(document.getElementById('data').text).data;
		return fetch('http://cityverve-campaign-analytics.azurewebsites.net/api/campaign/analytics', {
			method: 'POST',
			body: JSON.stringify({
			action: action,
			postId: id ,  // the card after the one that's swiped
			position: position,	// the card after the one that's swiped
			profile: campaign.TargetUserId,	// the user id of the campaign (and author of posts)
			timestamp: time,
			macAddress: campaign.ClientMac
		}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch(e) {
	//	console.log(e);
	}
}

export default analytics;