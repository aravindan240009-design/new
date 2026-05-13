import { CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function SuccessPage() {
  const { state } = useLocation();
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-74px)] max-w-3xl items-center justify-center px-4 py-10">
        <div className="panel w-full p-6 text-center sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-navy sm:text-3xl">Details Saved Successfully</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">Your hostel joining details have been saved in the hostel office records.</p>
          {state?.registerNumber && <p className="mt-5 rounded-md bg-blue-50 px-4 py-3 text-sm font-bold text-royal sm:text-base">Register Number: {state.registerNumber}</p>}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/apply" className="btn-primary">Save Another Record</Link>
            <Link to="/" className="btn-secondary">Go Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
