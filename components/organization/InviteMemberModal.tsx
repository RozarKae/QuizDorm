import React, { useState } from "react";
import { UserPlus, Mail, Link as LinkIcon, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orgName: string;
}

export function InviteMemberModal({ open, onOpenChange, orgName }: InviteMemberModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Administrator" | "Teacher" | "Student">("Teacher");
  const [department, setDepartment] = useState("Science");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const inviteLink = `https://quizdorm.com/join-org?code=ORG-8921`;

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter member email address");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Invitation sent to ${email} as ${role}!`);
      onOpenChange(false);
      setEmail("");
    }, 800);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("Join link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <UserPlus className="w-5 h-5 text-indigo-600 mr-2" /> Invite Members to {orgName}
          </DialogTitle>
          <DialogDescription>
            Send email invitations or share direct join link with teachers, students, or administrators.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSendInvite} className="space-y-4 py-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@school.edu"
                className="pl-9 text-xs h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
                Assign Role
              </label>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                options={[
                  { value: "Administrator", label: "Administrator" },
                  { value: "Teacher", label: "Teacher" },
                  { value: "Student", label: "Student" },
                ]}
                className="text-xs h-10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
                Department
              </label>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                options={[
                  { value: "Science", label: "Science" },
                  { value: "Mathematics", label: "Mathematics" },
                  { value: "English", label: "English" },
                  { value: "Commerce", label: "Commerce" },
                ]}
                className="text-xs h-10"
              />
            </div>
          </div>

          {/* Copy Direct Link Section */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-900 space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500">Or Share Direct Join Link</label>
            <div className="flex space-x-2">
              <Input value={inviteLink} readOnly className="text-xs bg-gray-50 dark:bg-gray-900 font-mono text-gray-600" />
              <Button type="button" variant="outline" size="sm" onClick={handleCopyLink} className="shrink-0 text-xs">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
              {loading ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
