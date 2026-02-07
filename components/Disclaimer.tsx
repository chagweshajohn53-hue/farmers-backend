import React from 'react';

interface DisclaimerProps {
  onClose: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-emerald-900 p-4 flex justify-between items-center">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
            Disclaimer – Farmers Adverts
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
            <h3 className="font-black text-xl uppercase italic">Farmers Adverts</h3>
            <p className="text-emerald-600 font-bold">Last Updated: 01 February 2026</p>
          </div>

          <div className="space-y-4">
            <p>The information and advertisements published on Farmers Adverts are provided for general information and promotional purposes only. By using this Platform, you acknowledge and agree to the terms of this Disclaimer.</p>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">1. Advertising Platform Only</h4>
              <p className="ml-4">Farmers Adverts operates solely as an online advertising and search platform. We do not own, sell, produce, verify, or guarantee any products, services, job opportunities, trainings, or offers advertised on the Platform.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">2. No Verification of Advertisers</h4>
              <p className="ml-4">Farmers Adverts does not verify advertisers, employers, service providers, or training facilitators. We do not guarantee the accuracy, completeness, or reliability of any advert or listing. Users are responsible for conducting their own due diligence before engaging in any transaction or agreement.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">3. No Guarantees</h4>
              <p className="ml-4">Farmers Adverts makes no guarantees regarding:</p>
              <ul className="ml-8 list-disc space-y-1">
                <li>Sales, profits, or business growth</li>
                <li>Employment, recruitment success, or job placements</li>
                <li>Training quality, certification, or outcomes</li>
                <li>Availability or performance of advertised goods or services</li>
              </ul>
              <p className="ml-4">All engagements are undertaken at the user's own risk.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">4. Financial & Transaction Risk</h4>
              <p className="ml-4">Farmers Adverts is not a party to any transaction between users and advertisers. We do not handle payments, deliveries, employment contracts, or service agreements unless explicitly stated. We are not responsible for financial losses, fraud, or disputes arising from user interactions.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">5. Job Adverts & Agent Fees</h4>
              <p className="ml-4">Job adverts are posted by third parties. Any recruitment or agent fees are determined by advertisers and must be clarified directly with them. Farmers Adverts is not responsible for employment decisions, labour disputes, or recruitment outcomes.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">6. Agricultural & Training Information</h4>
              <p className="ml-4">Any agricultural, technical, or training-related information provided in adverts is not professional advice. Users should consult qualified professionals before making farming, financial, or business decisions. Results may vary depending on conditions, skills, and resources.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">7. External Links</h4>
              <p className="ml-4">The Platform may contain links or contact details leading to third-party websites or services. Farmers Adverts has no control over and assumes no responsibility for the content, practices, or availability of such external platforms.</p>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">8. Limitation of Liability</h4>
              <p className="ml-4">To the fullest extent permitted by law, Farmers Adverts shall not be liable for:</p>
              <ul className="ml-8 list-disc space-y-1">
                <li>Direct or indirect losses or damages</li>
                <li>Loss of income, profit, or opportunity</li>
                <li>Fraud, misrepresentation, or misconduct by advertisers</li>
                <li>Any reliance placed on information found on the Platform</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">9. User Responsibility</h4>
              <p className="ml-4">Users agree to:</p>
              <ul className="ml-8 list-disc space-y-1">
                <li>Verify information independently</li>
                <li>Exercise caution when making payments or commitments</li>
                <li>Report suspected scams or misleading adverts to Farmers Adverts immediately</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg text-emerald-800 uppercase">10. Changes to Disclaimer</h4>
              <p className="ml-4">Farmers Adverts reserves the right to modify this Disclaimer at any time without prior notice. Continued use of the Platform constitutes acceptance of the updated Disclaimer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;