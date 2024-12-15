import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  // Attributes
  // Create Account
  readonly createAccountLocators: {
    button: Locator;
    firstNameField: Locator;
    lastNameField: Locator;
    emailField: Locator;
    passwordField: Locator;
    confirmPasswordField: Locator;
    submitButton: Locator;
    accountHeading: Locator;
    mainContent: Locator;
  };

  // Sign In
  readonly signInLocators: {
    button: Locator;
    emailField: Locator;
    passwordField: Locator;
    submitButton: Locator;
    bannerWelcomeMessage: Locator;
    bannerChangeButton: Locator;
    accountLink: Locator;
  };

  // Constructor
  constructor(page: Page) {
    // Create Account locators
    this.createAccountLocators = {
      button: page.getByRole("link", { name: "Create an Account" }),
      firstNameField: page.getByLabel("First Name"),
      lastNameField: page.getByLabel("Last Name"),
      emailField: page.getByLabel("Email", { exact: true }),
      passwordField: page.getByRole("textbox", {
        name: "Password*",
        exact: true,
      }),
      confirmPasswordField: page.getByLabel("Confirm Password"),
      submitButton: page.getByRole("button", { name: "Create an Account" }),
      accountHeading: page
        .getByRole("heading", { name: "My Account" })
        .locator("span"),
      mainContent: page.locator("#maincontent"),
    };

    // Sign In locators
    this.signInLocators = {
      button: page.getByRole("link", { name: "Sign In" }),
      emailField: page.getByLabel("Email", { exact: true }),
      passwordField: page.getByLabel("Password"),
      submitButton: page.getByRole("button", { name: "Sign In" }),
      bannerWelcomeMessage: page.getByRole("banner").getByText("Welcome,"),
      bannerChangeButton: page
        .getByRole("banner")
        .locator("button")
        .filter({ hasText: "Change" }),
      accountLink: page.getByRole("link", { name: "My Account" }),
    };
  }

  // Methods

  async createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const {
      button,
      firstNameField,
      lastNameField,
      emailField,
      passwordField,
      confirmPasswordField,
      submitButton,
    } = this.createAccountLocators;

    await button.click();
    await firstNameField.fill(firstName);
    await lastNameField.fill(lastName);
    await emailField.fill(email);
    await passwordField.fill(password);
    await confirmPasswordField.fill(password);
    await submitButton.click();
  }

  async verifyAccountCreation(
    firstName: string,
    lastName: string,
    email: string
  ) {
    const { accountHeading, mainContent } = this.createAccountLocators;

    await expect(accountHeading).toBeVisible();
    await expect(mainContent).toMatchAriaSnapshot(`
      - strong: Contact Information
      - paragraph: ${firstName} ${lastName} ${email}
      - link "Edit"
      - link "Change Password"
    `);
  }

  async signIn(email: string, password: string) {
    const { button, emailField, passwordField, submitButton } =
      this.signInLocators;

    await button.click();
    await emailField.fill(email);
    await passwordField.fill(password);
    await submitButton.click();
  }

  async verifySignIn(firstName: string, lastName: string, email: string) {
    const { bannerWelcomeMessage, bannerChangeButton, accountLink } =
      this.signInLocators;
    const { mainContent } = this.createAccountLocators;

    await expect(bannerWelcomeMessage).toHaveText(
      `Welcome, ${firstName} ${lastName}!`
    );
    await bannerChangeButton.click();
    await accountLink.click();
    await expect(mainContent).toMatchAriaSnapshot(`
      - strong: Contact Information
      - paragraph: ${firstName} ${lastName} ${email}
      - link "Edit"
      - link "Change Password"
    `);
  }
}
