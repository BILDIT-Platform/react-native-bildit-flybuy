# React Native FlyBuy Core SDK wrapper Example

# Getting Started

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Update environment variable

```bash
cp .env.example .env
```

Then update the values based on your configuration

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Step 4: Wrapper wrapper and sync

The package on the example app is not symlinked to the monorepo package, so when we modify the development pods in XCode, we need to automatically sync the files.

Modify the path in `scripts/watch-and-copy.sh` to match your local path and make sure to change the path according to the package that you want to modify and sync.