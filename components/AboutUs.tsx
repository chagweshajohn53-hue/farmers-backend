import React from 'react';

interface AboutUsProps {
  onClose: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col">
        <div className="bg-emerald-900 p-4 flex justify-between items-center">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
            About Us – Farmers Adverts
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-emerald-400 text-2xl font-bold"
          >
            ✖
          </button>
        </div>
        
        <div className="overflow-y-auto p-8">
          <div className="space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              Farmers Adverts is an agribusiness-focused advertising and marketing platform dedicated to promoting farmers, agricultural products, services, training programs and job opportunities within the agricultural sector.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mandate is to bridge the gap between farmers, agripreneurs, agribusinesses and markets by providing affordable, effective and targeted advertising solutions. We help our clients gain visibility, attract customers and grow sustainably through digital promotions, posters, job adverts, training publicity and agribusiness campaigns.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              At Farmers Adverts, we believe that agriculture thrives when information is shared, opportunities are visible, and farmers are empowered. We are committed to supporting the growth of the agricultural sector by promoting innovation, knowledge and profitable farming.
            </p>
            
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-center text-emerald-800 font-black text-xl uppercase italic">
                Promoting Agribusiness Through Advertising is our Mandate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;