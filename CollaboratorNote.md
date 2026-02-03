# Collaborator Note

## How to Upgrade the FlyBuy SDK

1. **Update SDK Versions**
   - Bump the Android SDK version (`sdkVersion` and `flybuyVersion`) to the desired version (e.g., 2.14.6) in all relevant `mono/packages/*/android/gradle.properties` files.
   - Replace the iOS SDK (`FlyBuy.xcframework`) in each package with the new version (e.g., 2.11.4).

2. **Update Native Wrapper Code**
   - Apply any required API changes (deprecations, new methods, etc.) in the native wrapper code for both iOS and Android.
   - Expose new SDK methods to JS/TS as needed.

3. **Update Example/Development App**
   - Ensure the development app uses the latest local package versions and updated APIs.

---

## How to Commit

1. **Stage your changes:**
   ```sh
   git add .
   ```
2. **Write a clear commit message:**
   - Use conventional commit format, e.g.:
     ```sh
     LEFTHOOK=0 git commit -m "feat(core): bump FlyBuy SDK to 2.14.6/2.11.4 and update wrapper APIs"
     ```
3. **Push your changes:**
   ```sh
   git push origin <your-branch>
   ```

---

## How to Prepare the Packages

1. **Install dependencies:**
   ```sh
   yarn install
   ```
2. **Build all packages:**
    ```sh
    npx lerna run prepare
    ```

---

## How to Release

**Prerequisite:** Two-factor authentication (2FA) or a granular access token with **bypass 2FA** enabled is required to publish packages. Use your npm token as follows.

1. **Configure your npm token** (choose one):
   - **Option A – Environment variable (CI or local):**  
     Create or edit `mono/.npmrc` (do not commit the token). Add:
     ```ini
     //registry.npmjs.org/:_authToken=${NPM_TOKEN}
     ```
     Then run:
     ```sh
     export NPM_TOKEN=your_npm_token_here
     cd mono && npx lerna publish
     ```
   - **Option B – Log in once:**  
     From `mono/` run `npm login` and follow the prompts. Then run `npx lerna publish` as needed.

2. **Publish to npm:**
   - From the monorepo root, run:
     ```sh
     cd mono && npx lerna publish
     ```
3. **Select the version:**
   

---

**Best Practices:**
- Test the development app on both Android and iOS before releasing.
- Review the changelog and ensure all breaking changes are documented.
- Coordinate with collaborators before publishing major updates.

