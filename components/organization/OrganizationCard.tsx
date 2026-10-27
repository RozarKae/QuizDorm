import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrganizationItem } from "@/lib/types/organization";
import { ArrowRight,GraduationCap,MapPin,Users } from "lucide-react";
import Link from "next/link";

interface OrganizationCardProps {
  organization: OrganizationItem;
  isActive?: boolean;
  onSelect?: () => void;
}

export function OrganizationCard({ organization, isActive, onSelect }: OrganizationCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-950 p-6 rounded-3xl border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between ${
        isActive ? "border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-950/20" : "border-gray-100 dark:border-gray-850"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shrink-0">
              {organization.name.charAt(0)}
            </div>
            <div>
              <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[10px] font-bold">
                {organization.type}
              </Badge>
              <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 mt-1">
                {organization.name}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {organization.description}
        </p>

        <div className="flex items-center space-x-3 text-xs text-gray-400 mb-6">
          <span className="flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1" /> {organization.city}, {organization.state}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-850 text-xs mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <div>
              <p className="font-extrabold text-gray-900 dark:text-white">{organization.teacherCount}</p>
              <p className="text-[10px] text-gray-400">Teachers</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-rose-600" />
            <div>
              <p className="font-extrabold text-gray-900 dark:text-white">{organization.studentCount}</p>
              <p className="text-[10px] text-gray-400">Students</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
        <Link href={`/dashboard/organizations/${organization.id}`}>
          <Button variant="outline" size="sm" className="text-xs font-semibold rounded-xl">
            Workspace Overview <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
        {onSelect && (
          <Button
            onClick={onSelect}
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl"
          >
            Switch Workspace
          </Button>
        )}
      </div>
    </div>
  );
}
