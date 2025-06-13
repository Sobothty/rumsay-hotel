import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center border border-blue-100">
        <div className="relative mb-6">
          <span className="absolute inset-0 flex items-center justify-center animate-ping-slow">
            <CheckCircle2 className="w-24 h-24 text-green-400 opacity-40" />
          </span>
          <CheckCircle2 className="w-20 h-20 text-green-500 drop-shadow-lg animate-bounce-in" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Payment Successful!
        </h2>
        <p className="text-gray-600 text-lg mb-6 text-center">
          Thank you for your payment. Your booking is confirmed and a receipt
          has been sent to your email.
        </p>
        <Link
          to="/"
          className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
      {/* Animation styles */}
      <style>
        {`
          @keyframes bounce-in {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            60% {
              transform: scale(1.2);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-bounce-in {
            animation: bounce-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
          }
          @keyframes ping-slow {
            0% {
              transform: scale(1);
              opacity: 0.5;
            }
            80%, 100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          .animate-ping-slow {
            animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentSuccess;
