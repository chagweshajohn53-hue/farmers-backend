import React from 'react';

interface ContactUsProps {
  onClose: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="bg-emerald-900 p-4 flex justify-between items-center">
          <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
            Contact Farmers Adverts
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-emerald-400 text-2xl font-bold"
          >
            ✖
          </button>
        </div>
        
        <div className="overflow-y-auto p-8 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-emerald-800 uppercase mb-6">Contact Farmers Adverts</h3>
            
            <div className="space-y-6">
              <div>
                <p className="font-bold text-gray-700 text-lg">Email:</p>
                <p className="text-emerald-600 font-semibold text-xl">farmersadverts2026@gmail.com</p>
              </div>
              
              <div>
                <p className="font-bold text-gray-700 text-lg">Call & WhatsApp:</p>
                <p className="text-emerald-600 font-semibold text-xl">+263 732 606 878</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-gray-700 font-medium">
                "We are available to support advertisers, farmers, and businesses using the Farmers Adverts platform."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;