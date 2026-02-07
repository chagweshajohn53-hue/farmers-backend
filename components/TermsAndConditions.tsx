import React from 'react';

interface TermsAndConditionsProps {
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-emerald-900 p-4 flex justify-between items-center">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
            TERMS AND CONDITIONS – Farmers Adverts
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-emerald-400 text-2xl font-bold"
          >
            ✖
          </button>
        </div>
        
        <div className="overflow-y-auto p-6 space-y-4">
          <div className="text-center mb-6">
            <h3 className="font-black text-lg uppercase italic">Farmers Adverts – Advertising & Search Web App</h3>
            <p className="text-emerald-600 font-bold">Effective Date: 01 February 2026</p>
            <p className="mt-2">Welcome to Farmers Adverts, an online advertising and search platform promoting agribusiness products, services, job opportunities, trainings, and related content. By accessing or using this web application, you agree to the Terms and Conditions outlined below.</p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">1. Definitions</h4>
              <p className="ml-4">"Platform" refers to the Farmers Adverts web application and website.</p>
              <p className="ml-4">"Farmers Adverts", "we", "us", or "our" refers to Farmers Adverts.</p>
              <p className="ml-4">"User" refers to any person browsing, searching, or interacting with the Platform.</p>
              <p className="ml-4">"Advertiser" refers to any individual, company, or organisation posting adverts.</p>
              <p className="ml-4">"Content" refers to adverts, listings, images, videos, text, job posts, training notices, or any material uploaded to the Platform.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">2. Use of the Platform</h4>
              <p className="ml-4">The Platform may be used for lawful advertising, searching, and information purposes only. Users must be at least 18 years old or have parental/guardian consent. You agree not to misuse the Platform or attempt to disrupt its services.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">3. Advertising & Listings Policy</h4>
              <p className="ml-4">All adverts must be truthful, accurate, and lawful. Advertisers are responsible for the authenticity of their adverts, including job vacancies, farm inputs, livestock, services, or trainings. False, misleading, scam, or illegal adverts are strictly prohibited. Farmers Adverts reserves the right to approve, edit, reject, suspend, or remove any advert without prior notice. Posting an advert does not guarantee enquiries, leads, sales, or employment outcomes.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">4. Job Adverts & Training Notices</h4>
              <p className="ml-4">Job advertisers must ensure vacancies are genuine and lawful. Any recruitment or agent fees must be clearly stated in the advert. Farmers Adverts is not responsible for employer–employee disputes, recruitment outcomes, or training quality. Users are advised to verify details before making payments or commitments.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">5. Search Results & Advert Placement</h4>
              <p className="ml-4">Search results are displayed based on relevance, category, keywords, posting date, or paid promotion. Sponsored or promoted adverts may appear above organic listings. We do not guarantee ranking, visibility, or performance unless stated in a paid advertising agreement.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">6. Payments, Fees & Promotions</h4>
              <p className="ml-4">Advertising fees must be paid in advance unless otherwise agreed. All payments are non-refundable once an advert has been published. Promotional packages, pricing, and durations may change at any time. Failure to pay may result in advert removal or account suspension.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">7. User Content & Intellectual Property</h4>
              <p className="ml-4">Advertisers retain ownership of their content. By uploading content, you grant Farmers Adverts a non-exclusive, royalty-free licence to display, promote, and distribute your content on our Platform and marketing channels. You confirm that you own or have permission to use all uploaded content.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">8. Prohibited Content & Conduct</h4>
              <p className="ml-4">Users and advertisers must not:</p>
              <ul className="ml-8 list-disc space-y-1">
                <li>Post scam, fake, or deceptive adverts</li>
                <li>Publish offensive, discriminatory, or abusive content</li>
                <li>Promote illegal goods or activities</li>
                <li>Impersonate another person or business</li>
                <li>Harvest data or spam other users</li>
                <li>Attempt unauthorised access, hacking, or system interference</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">9. Account Suspension & Termination</h4>
              <p className="ml-4">Farmers Adverts reserves the right to:</p>
              <ul className="ml-8 list-disc space-y-1">
                <li>Suspend or terminate accounts violating these Terms</li>
                <li>Remove content that breaches policies or applicable laws</li>
                <li>Restrict access to protect the integrity of the Platform</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">10. Disclaimer & Limitation of Liability</h4>
              <p className="ml-4">Farmers Adverts acts solely as an advertising and search platform. We are not liable for losses, damages, fraud, disputes, or outcomes resulting from user interactions, adverts, or transactions. Users engage with advertisers at their own risk.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">11. Privacy & Data Protection</h4>
              <p className="ml-4">Use of the Platform is also governed by our Privacy Policy, which explains how personal data is collected, stored, and used.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">12. Changes to These Terms</h4>
              <p className="ml-4">Farmers Adverts may update these Terms at any time. Continued use of the Platform constitutes acceptance of the revised Terms.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">13. Governing Law</h4>
              <p className="ml-4">These Terms shall be governed and interpreted in accordance with the laws of the Republic of Zimbabwe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;