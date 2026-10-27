"use client";

import { Button } from "@/components/ui/button";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { OrganizationType } from "@/lib/types/organization";
import { ArrowLeft,Building2,Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React,{ useState } from "react";
import { toast } from "sonner";

export default function RegisterOrganizationPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState<OrganizationType>("School");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState("California");
  const [city, setCity] = useState("San Francisco");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Organization name and email are required");
      return;
    }
    toast.success(`Organization "${name}" registered successfully!`);
    router.push("/dashboard/organizations");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      <div>
        <Link href="/dashboard/organizations" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Organizations
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Building2 className="w-6 h-6 text-indigo-600 mr-2" /> Register New Organization Workspace
        </h1>
        <p className="text-sm text-gray-500">Create an isolated SaaS workspace for your school, college, or institute</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Organization Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Stanford Academy of Science"
              className="text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Institution Type</label>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as OrganizationType)}
              options={[
                { value: "School", label: "School" },
                { value: "College", label: "College" },
                { value: "Quiz Institute", label: "Quiz Institute" },
                { value: "Coaching Centre", label: "Coaching Centre" },
                { value: "NGO", label: "NGO" },
                { value: "Corporate", label: "Corporate" },
              ]}
              className="text-xs font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief overview of the organization..."
            className="w-full rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 text-xs text-gray-900 dark:text-gray-100"
          />
        </div>

        <ImageDropzone label="Organization Logo (Optional)" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">City</label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} className="text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">State / Province</label>
            <Input value={state} onChange={(e) => setState(e.target.value)} className="text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Country</label>
            <Input value={country} onChange={(e) => setCountry(e.target.value)} className="text-xs" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Contact Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@school.edu" className="text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Official Website</label>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://school.edu" className="text-xs" />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <Link href="/dashboard/organizations">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl px-6">
            <Save className="w-4 h-4 mr-1.5" /> Complete Registration
          </Button>
        </div>
      </form>
    </div>
  );
}
