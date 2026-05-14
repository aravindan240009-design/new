import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getApplication, updateApplication } from '../api/applicationApi';
import ApplicationFormFields, { emptyApplication } from '../components/ApplicationFormFields';
import Loading from '../components/Loading';
import { HostelApplicationPayload } from '../types/application';
import { applicationSchema } from './StudentApplicationForm';

export default function EditApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, reset, handleSubmit, formState: { errors } } = useForm<HostelApplicationPayload>({
    resolver: zodResolver(applicationSchema),
    defaultValues: emptyApplication,
  });

  useEffect(() => {
    if (!id) return;
    getApplication(id).then((app) => {
      reset({
        studentName: app.studentName,
        parentName: app.parentName,
        parentContactNo: app.parentContactNo,
        dateOfJoining: app.dateOfJoining,
        dateOfBirth: app.dateOfBirth,
        gender: app.gender,
        course: app.course,
        registerNumber: app.registerNumber,
        studentMobileNo: app.studentMobileNo,
        residenceAddress: app.residenceAddress,
        permanentAddress: app.permanentAddress,
        localGuardianName: app.localGuardianName,
        localGuardianContactNo: app.localGuardianContactNo,
        localGuardianAddress: app.localGuardianAddress,
        hostelName: app.hostelName || '',
        floorNo: app.floorNo || '',
        roomNo: app.roomNo || '',
        bedNo: app.bedNo || '',
        wardenName: app.wardenName || '',
        wardenContactNo: app.wardenContactNo || '',
      });
      setLoading(false);
    });
  }, [id, reset]);

  const submit = async (payload: HostelApplicationPayload) => {
    if (!id) return;
    setSaving(true);
    try {
      await updateApplication(id, payload);
      toast.success('Student record updated');
      navigate(`/admin/applications/${id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-5 page-fade">
      <Link to={`/admin/applications/${id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-royal"><ArrowLeft className="h-4 w-4" />Back</Link>
      <form onSubmit={handleSubmit(submit)} className="panel bg-slate-50 p-4 sm:p-6">
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-navy via-[#143a68] to-[#0b1b33] p-5 text-white sm:p-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Edit Student Record</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">Update submitted student details for the hostel office database.</p>
        </div>
        <ApplicationFormFields register={register} errors={errors} />
        <div className="mt-8 flex justify-end">
          <button className="btn-primary w-full sm:w-auto" disabled={saving}><Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save Update'}</button>
        </div>
      </form>
    </div>
  );
}
