import React from 'react';
import s from './styles.css';

class TermsAndConditionsContent extends React.Component {
	
	shouldComponentUpdate() {
		return false;
	}

	render (props) {
		return (
			<div className={s.content}>
				<header className={s.header}>
					<div className={s.wrapper}>
						<button className={s.closeButton} onClick={this.props.onClickHandler}>{ "Close" }</button>
					</div>
				</header>
				<div className={s.contentWrapper}>{/* wrap content in container that takes the remaining viewport space */}
					<div className={s.content}>	{/* gives content vertical scrollable length */}
						<article className={s.main}>	{/* horizontally position content */}
							<section id="Introduction">
								<h1>Terms and Conditions<span className="sr-only">.</span></h1>
								<p><strong>PLEASE READ CAREFULLY BEFORE JOINING OUR WIFI SERVICE.</strong></p>
								<p>
									These are the terms and conditions (“Terms”) for <strong>KILTR Limited of 
									1 Bothwell Lane, Glasgow, G12 8JS</strong> (“KILTR”, “us” or “we”) for use of our wireless 
									internet access service (the <strong>"Service"</strong>).
								</p>
							</section>
							<section id="Acknowledgements">
								<h2>Acknowledgements<span className="sr-only">.</span></h2>
								<p>These Terms apply to your use of the Service including any updates to the Service.</p>
								<p>
									We may change these terms at any time and all changes will be provided to you through a 
									link on the Service log-in page. The new terms may be displayed on-screen and you may be required
									to read and accept them to continue your use of the Service.</p>
								<p>
									You will be assumed to have obtained permission from the owners of any device that is controlled,
									but not owned, by you which you use in relation to the Service. You and they may be charged by your 
									and their service providers for internet access on such a device. You accept responsibility for the use 
									of the Service on or in relation to any device you control, whether or not it is owned by you (each a 
									“<strong>Device</strong>”).
								</p>
								<p>
									You acknowledge and agree that internet transmissions are never completely private or secure. 
									You understand that any message or information you send using the Service may be read or intercepted by others, 
									even if there is a special notice that a particular transmission is encrypted. 
								</p>
							</section>
							<section id="PermittedUse">
								<h2>Permitted Use of the Service<span className="sr-only">.</span></h2>
								<p>Your right to use the Service is subject to these Terms and your compliance with them.</p>
								<p>You may continue to use the Service free of charge provided that you accept these terms.</p>
								<p>You may stop using the Service at any time.</p>
								<p>We may cease provision of the Service at any time.</p>
							</section>
							<section id="AcceptableUse">
								<h2>Acceptable Use<span className="sr-only">.</span></h2>
								<p>You must not:</p>
								<ol className="list-lettered" type="a">
									<li>
										use the Service in any unlawful manner, for any unlawful purpose, or in any manner inconsistent 
										with these Terms, or act fraudulently or maliciously, for example, by hacking into or inserting 
										malicious code, including viruses, or harmful data, into the Service or any operating system; 
									</li>
									<li>
										infringe our intellectual property rights or those of any third party in relation to your use of the Service;
									</li>
									<li>
										transmit any material that is defamatory, offensive or otherwise objectionable in relation to your use of the 
										Service;
									</li>
									<li>
										use the Service in a way that could damage, disable, overburden, impair or compromise our systems or security or 
										interfere with other users;
									</li>
									<li>
										collect or harvest any information or data from any Service or our systems or attempt to decipher any 
										transmissions to or from the servers running any Service;
									</li>
									<li>
										use the Service for any commercial purposes;
									</li>
									<li>
										use the Service to send unsolicited emails;
									</li>
									<li>
										use the Service to transmit, store, publish or upload any electronic material which is known or is likely to cause, 
										damage or destroy or limit the functionality of any computer software, hardware or telecommunications equipment; or
									</li>
									<li>
										invade the privacy of another person, cause annoyance, inconvenience or needless anxiety to another person.
									</li>
								</ol>
							</section>
							<section id="IntellectualPropertyRights">
								<h2>Intellectual Property Rights<span className="sr-only">.</span></h2>
								<p>
									You acknowledge that all intellectual property rights in the Service and the underlying technology belong to us or our 
									licensors, and that you have no rights in, or to, the Service other than the right to use it in accordance with these
									Terms.
								</p>
							</section>
							<section id="LimitationOfLiability">
								<h2>Limitation of Liability<span className="sr-only">.</span></h2>
								<p>
									The Service is provided to you on an "as is" basis and therefore all warranties, conditions and other terms implied by 
									statute or common law are, to the fullest extent permitted by law, excluded from this agreement.</p>
								<p>
									Except for breaches of the Data Protection Act 1998, we shall not be liable to you in respect of any losses caused by 
									failures, errors, delays or interruptions relating to the Service, including any failure to supply the Service due to 
									events which are beyond our reasonable control. 
								</p>
								<p>
									KILTR shall not be liable to you if any third party: 
								</p>
								<ol className="list-lettered"  type="a">
									<li>gains access to your connection to the Service or your Device; or </li>
									<li>destroys or damages any data or information held by you or information about you which is held by us.</li>
								</ol>
							</section>
							<section id="Termination">
								<h2>Termination<span className="sr-only">.</span></h2>
								<p>
									We may terminate the Agreement immediately without notice to you if you commit a material or persistent breach 
									of these terms. For the avoidance of doubt any breach of the terms of the Acceptable Use section above will be 
									considered a material breach.   
								</p>
								<p>
									On termination for any reason: 
								</p>
								<ol className="list-lettered"  type="a">
									<li>all rights granted to you under these Terms shall cease;</li>
									<li>you must immediately cease your use of the Service; </li>
									<li>we will cease providing you with access to the Service<span className="sr-only">.</span></li>
								</ol>
								<p>
									Termination of the Agreement shall be without prejudice to the rights or remedies or either party accrued prior to 
									the date of termination. 
								</p>
							</section>
							<section id="EventsOutsideOurControl">
								<h2>Events Outside Our Control<span className="sr-only">.</span></h2>
								<p>
									We will not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations
									under these Terms that is caused by any act or event beyond our reasonable control, including failure of public or 
									private telecommunications networks or interruptions in third party services. 
								</p>
							</section>
							<section id="UseOfYourData">
								<h2>Use of Your Data<span className="sr-only">.</span></h2>
								<p>
									This section explains the data we collect from you when you use your Device to access and use the Service, and how we 
									use that data. For the purpose of the Data Protection Act 1998, the data controller is
									<address>KILTR Limited, of 1 Bothwell Lane, Glasgow, G12 8JS</address>.
								</p>
							</section>
							<section id="InformationWeMayCollectFromYou">
								<h2>Information We May Collect From You<span className="sr-only">.</span></h2>
								<p>
									The only data we collect from you regarding your use of the Service is the unique hardware number for your Device 
									(known as a MAC address) together with the location data for that Device while you are using it to access the Service.
									We do not collect any personally identifiable information from you.
								</p>
							</section>
							<section id="WhereWeStoreThisData">
								<h2>Where We Store this Data<span className="sr-only">.</span></h2>
								<p>
									This data is generally located on our secure servers in Europe however it may be transferred to,
									and stored at, a destination outside the EEA. These staff may be engaged in the fulfilment of the 
									Service or the provision of support services. We will take all steps reasonably necessary to ensure 
									that your data is treated securely and in accordance with these Terms.
								</p>
							</section>
							<section id="UsesMadeOfTheInformation">
								<h2>Uses Made of the Information<span className="sr-only">.</span></h2>
								<p>
									We use information held about you in the following ways: 
								</p>
								<ol>
									<li>To provide you with information regarding the venue in which you are using the Service including information relating to their goods and services;</li>
									<li>To provide it to the venue owner or sponsor to enable them to see how the venue is being used;</li>
									<li>To report anonymised aggregate information to our advertisers or selected third parties for consumer analysis.</li>
								</ol>
								<p>
									We do not disclose information about identifiable individuals to our advertisers, but we may provide them with 
									aggregate information about users of our Service. We may also use such aggregate information to help advertisers reach the kind of audience 
									they want to target. We may make use of the data we have collected from you to enable us to comply with our advertisers' wishes by displaying 
									their advertisement to that target audience. 
								</p>
							</section>
							<section id="DisclosureOfYourInformation">
								<h2>Disclosure of Your Information<span className="sr-only">.</span></h2>
								<p>We may disclose data obtained from you to any member of our group, which means our subsidiaries, our ultimate holding company and its subsidiaries, as defined in section 1159 of the Companies Act 2006. 
								</p>
								<p>We may disclose data obtained from you to the following:</p>
								<ul>
									<li>To our customers who operate and own the venue where you access the Service. </li>
									<li>To the sponsors of the venue where you access the Service; </li>
									<li>
										In the event that we sell or buy any business or assets, in which case we may disclose the data to the prospective 
										seller or buyer of such business or assets.
									</li>
									<li>If KILTR or substantially all of its assets are acquired by a third party. </li>
									<li>
										If we are under a duty to disclose or share data obtained from you in order to comply with any legal or regulatory obligation
										or request.</li>
									<li>In order to: 
										<ul>
											<li>enforce this Agreement and/or to investigate potential breaches; or </li>
											<li>protect the rights, property or safety of KILTR Ltd, our customers, or others. This includes exchanging information with other companies and organisations for the purposes of fraud protection and credit risk reduction.</li>
										</ul>
									</li>
								</ul>
							</section>
							<section id="AccessToInformation">
								<h2>Access to Information<span className="sr-only">.</span></h2>
								<p>The Data Protection Act 1998 gives you the right to access personal information held about you. Your right of access can be exercised in accordance with that Act.</p>
							</section>
							<section id="ThirdPartySites">
								<h2>Third Party Sites<span className="sr-only">.</span></h2>
								<p>
									Our Service may, from time to time, contain links to and from the websites of our partner networks, advertisers and affiliates 
									(including, but not limited to, websites on which the Service is advertised). If you follow a link to any of these websites, please 
									note that these websites and any services that may be accessible through them have their own privacy policies and that we do not 
									accept any responsibility or liability for these policies or for any personal data that may be collected through these websites or 
									services, such as contact and location data. Please check these policies before you submit any personal data to these websites or use these services.
								</p>
							</section>
							<section id="OtherImportantTerms">
								<h2>Other Important Terms<span className="sr-only">.</span></h2>
								<p>We may transfer our rights and obligations under the Agreement to another organisation, but this will not affect your rights or our obligations under the Agreement.</p>
								<p>You may only transfer your rights or obligations under the Agreement to another person if we agree in writing. </p>
								<p>If we fail to insist that you perform any of your obligations under the Agreement, or if we do not enforce our rights 
									against you, or if we delay in doing so, that will not mean that we have waived our rights against you and will not mean 
									that you do not have to comply with those obligations. If we do waive a default by you, we will only do so in writing, 
									and that will not mean that we will automatically waive any later default by you.</p>
								<p>
									Each of the conditions of the Agreement operates separately. If any court or competent authority decides that any of them are unlawful or unenforceable, 
									the remaining conditions will remain in full force and effect.
								</p>
								<p>
									Please note that the Agreement, its subject matter and its formation, are governed by Scots law. You and we both agree that the courts of Scotland will 
									have non-exclusive jurisdiction. 
								</p>
							</section>
							<section id="Contact">
								<h2>Contact<span className={s.sr}>.</span></h2>
								<p>Questions, comments and requests regarding this privacy policy are welcomed and should be addressed to: </p>
								<address>KILTR Limited, 1 Bothwell Lane, Glasgow, G12 8JS</address>
							</section>
						</article>
					</div>
				</div>
			</div>
		);
	}
}

export default TermsAndConditionsContent;
