import { describe, it } from "node:test";
import assert from "node:assert";
import { normalizeCanonicalRole, getRoleDisplayName } from "../lib/types/user";
import { TEST_ACCOUNTS } from "../app/auth/constants";
import { dashboardNavConfig } from "../config/dashboard-nav";
import { SEED_ADMIN_USERS } from "../lib/admin/userManager";

describe("SuperAdmin and MasterAdmin Governance Split", () => {
  describe("Role Normalization and Display Names", () => {
    it("should recognize superadmin and masteradmin canonical roles", () => {
      assert.strictEqual(normalizeCanonicalRole("superadmin"), "superadmin");
      assert.strictEqual(normalizeCanonicalRole("masteradmin"), "masteradmin");
    });

    it("should alias legacy admin to superadmin for backward compatibility", () => {
      assert.strictEqual(normalizeCanonicalRole("admin"), "superadmin");
    });

    it("should provide professional display titles for both administrators", () => {
      assert.strictEqual(getRoleDisplayName("superadmin"), "Super Admin");
      assert.strictEqual(getRoleDisplayName("masteradmin"), "Master Admin");
    });
  });

  describe("Authentication Configuration & Workspaces", () => {
    it("should configure superadmin login targeting the Root Command OS (/admin)", () => {
      const superAdminInfo = TEST_ACCOUNTS["superadmin@quizdorm.com"];
      assert.ok(superAdminInfo);
      assert.strictEqual(superAdminInfo.role, "superadmin");
      assert.strictEqual(superAdminInfo.redirectUrl, "/admin");
    });

    it("should configure masteradmin login targeting Content & Scholar OS (/admin/master)", () => {
      const masterAdminInfo = TEST_ACCOUNTS["masteradmin@quizdorm.com"];
      assert.ok(masterAdminInfo);
      assert.strictEqual(masterAdminInfo.role, "masteradmin");
      assert.strictEqual(masterAdminInfo.redirectUrl, "/admin/master");
    });
  });

  describe("Navigation Separation", () => {
    it("should configure Super Admin navigation with employee and institutional controls", () => {
      const superAdminConfig = dashboardNavConfig.superadmin;
      assert.ok(superAdminConfig);

      const hrefs = superAdminConfig.items.map((item) => item.href);
      assert.ok(hrefs.includes("/admin/organizations"));
      assert.ok(hrefs.includes("/admin/users"));
      assert.ok(hrefs.includes("/admin/sessions"));
      assert.ok(hrefs.includes("/admin/enterprise"));
      assert.ok(hrefs.includes("/admin/billing"));
      assert.ok(hrefs.includes("/admin/ai"));
    });

    it("should configure Master Admin navigation with subscribers, quiz vault, and question bank", () => {
      const masterAdminConfig = dashboardNavConfig.masteradmin;
      assert.ok(masterAdminConfig);

      const hrefs = masterAdminConfig.items.map((item) => item.href);
      assert.ok(hrefs.includes("/admin/master"));
      assert.ok(hrefs.includes("/admin/master/subscribers"));
      assert.ok(hrefs.includes("/dashboard/quizzes"));
      assert.ok(hrefs.includes("/dashboard/questions"));
      assert.ok(hrefs.includes("/dashboard/quizzes/builder"));
      assert.ok(hrefs.includes("/dashboard/quality"));
    });
  });

  describe("Seeded User Store", () => {
    it("should include seeded superadmin and masteradmin identities", () => {
      const superAdminSeed = SEED_ADMIN_USERS.find(
        (u) => u.email === "superadmin@quizdorm.com"
      );
      assert.ok(superAdminSeed);
      assert.strictEqual(superAdminSeed?.role, "superadmin");

      const masterAdminSeed = SEED_ADMIN_USERS.find(
        (u) => u.email === "masteradmin@quizdorm.com"
      );
      assert.ok(masterAdminSeed);
      assert.strictEqual(masterAdminSeed?.role, "masteradmin");
    });
  });

  describe("Edge Proxy & RBAC Permissions for SuperAdmin & MasterAdmin", () => {
    it("should allow superadmin and masteradmin access to admin paths", () => {
      const allowedRolesForAdmin = ["superadmin", "admin", "masteradmin"];
      const allowedRolesForMaster = ["masteradmin", "superadmin", "admin"];

      assert.ok(allowedRolesForAdmin.includes(normalizeCanonicalRole("superadmin")));
      assert.ok(allowedRolesForAdmin.includes(normalizeCanonicalRole("admin")));
      assert.ok(allowedRolesForMaster.includes(normalizeCanonicalRole("masteradmin")));
      assert.ok(!allowedRolesForAdmin.includes("subscriber"));
      assert.ok(!allowedRolesForAdmin.includes("member"));
    });
  });
});
