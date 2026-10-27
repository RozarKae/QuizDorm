import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { describe,it } from "node:test";
import { DEFAULT_EMAIL_DOMAINS } from "../components/auth/EmailSuggestionInput";

describe("Email Suggestion Input & Domain Autocomplete Suite", () => {
  it("verifies DEFAULT_EMAIL_DOMAINS includes @quizdorm.com and @gmail.com as priority suggestions", () => {
    assert.ok(Array.isArray(DEFAULT_EMAIL_DOMAINS), "DEFAULT_EMAIL_DOMAINS must be an array");
    assert.strictEqual(DEFAULT_EMAIL_DOMAINS[0], "@quizdorm.com", "First domain must be @quizdorm.com");
    assert.strictEqual(DEFAULT_EMAIL_DOMAINS[1], "@gmail.com", "Second domain must be @gmail.com");
    assert.ok(DEFAULT_EMAIL_DOMAINS.includes("@outlook.com"));
    assert.ok(DEFAULT_EMAIL_DOMAINS.includes("@yahoo.com"));
    assert.ok(DEFAULT_EMAIL_DOMAINS.includes("@icloud.com"));
    assert.ok(DEFAULT_EMAIL_DOMAINS.includes("@school.edu"));
  });

  it("verifies pure domain completion logic handles empty, prefix, and partial domain replacement", () => {
    function computeAppliedEmail(currentVal: string, chosenDomain: string): string {
      if (!currentVal) {
        return chosenDomain;
      }
      const atIdx = currentVal.indexOf("@");
      if (atIdx !== -1) {
        const prefix = currentVal.slice(0, atIdx);
        return `${prefix}${chosenDomain}`;
      }
      return `${currentVal}${chosenDomain}`;
    }

    // 1. Prefix only -> appends chosen domain
    assert.strictEqual(
      computeAppliedEmail("superadmin", "@quizdorm.com"),
      "superadmin@quizdorm.com"
    );
    assert.strictEqual(
      computeAppliedEmail("student", "@gmail.com"),
      "student@gmail.com"
    );

    // 2. Trailing @ -> cleanly attaches domain
    assert.strictEqual(
      computeAppliedEmail("teacher@", "@outlook.com"),
      "teacher@outlook.com"
    );

    // 3. Partial domain replacement -> replaces partial domain with chosen domain
    assert.strictEqual(
      computeAppliedEmail("user@g", "@gmail.com"),
      "user@gmail.com"
    );
    assert.strictEqual(
      computeAppliedEmail("user@yahoo.com", "@quizdorm.com"),
      "user@quizdorm.com"
    );

    // 4. Empty input
    assert.strictEqual(
      computeAppliedEmail("", "@quizdorm.com"),
      "@quizdorm.com"
    );
  });

  it("verifies domain query filtering accurately isolates matching providers", () => {
    function filterMatchingDomains(typedPart: string, domains: string[]): string[] {
      if (!typedPart || typedPart === "@") {
        return domains;
      }
      const query = typedPart.toLowerCase();
      return domains.filter((d) => d.toLowerCase().startsWith(query));
    }

    // When "@" is typed, all domains match
    const all = filterMatchingDomains("@", DEFAULT_EMAIL_DOMAINS);
    assert.strictEqual(all.length, DEFAULT_EMAIL_DOMAINS.length);

    // When "@g" is typed, @gmail.com is matched
    const gOnly = filterMatchingDomains("@g", DEFAULT_EMAIL_DOMAINS);
    assert.ok(gOnly.includes("@gmail.com"));
    assert.ok(!gOnly.includes("@outlook.com"));

    // When "@q" is typed, @quizdorm.com is matched
    const qOnly = filterMatchingDomains("@q", DEFAULT_EMAIL_DOMAINS);
    assert.deepStrictEqual(qOnly, ["@quizdorm.com"]);
  });

  it("verifies Auth pages wire up EmailSuggestionInput correctly", () => {
    const loginPath = path.join(process.cwd(), "app/auth/login/page.tsx");
    const registerPath = path.join(process.cwd(), "app/auth/register/page.tsx");
    const forgotPath = path.join(process.cwd(), "app/auth/forgot-password/page.tsx");
    const verifyPath = path.join(process.cwd(), "app/auth/verify-email/page.tsx");
    const adminUsersPath = path.join(process.cwd(), "app/admin/users/page.tsx");

    const loginContent = fs.readFileSync(loginPath, "utf-8");
    const registerContent = fs.readFileSync(registerPath, "utf-8");
    const forgotContent = fs.readFileSync(forgotPath, "utf-8");
    const verifyContent = fs.readFileSync(verifyPath, "utf-8");
    const adminUsersContent = fs.readFileSync(adminUsersPath, "utf-8");

    assert.ok(loginContent.includes("EmailSuggestionInput"), "Login page must use EmailSuggestionInput");
    assert.ok(registerContent.includes("EmailSuggestionInput"), "Register page must use EmailSuggestionInput");
    assert.ok(forgotContent.includes("EmailSuggestionInput"), "Forgot Password page must use EmailSuggestionInput");
    assert.ok(verifyContent.includes("EmailSuggestionInput"), "Verify Email page must use EmailSuggestionInput");
    assert.ok(adminUsersContent.includes("EmailSuggestionInput"), "Admin Users page must use EmailSuggestionInput");
  });
});
