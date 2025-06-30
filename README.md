# Trio - Bike Rental Boilerplate - React Native
![React Native](https://img.shields.io/badge/react--native-0.70.3-green?style=flat-square) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?style=flat-square)

https://user-images.githubusercontent.com/2034112/199245466-bc64de6b-c08a-42ab-9c23-d660fdb9867f.mp4

## How to run it

Install node modules:

```sh
yarn install
```

### iOS

Install pods:

```sh
cd ios && pod install
```

Run the app:

```sh
yarn ios
```

### Android

Run the app:

```sh
yarn android
```

## Tests

```sh
yarn test
```

## Folder structure

* [assets/](./app/assets)
  * [fonts/](./app/assets/fonts)
  * [index.ts](./app/assets/index.ts)
* [components/](./app/components)
  * [BikeCard/](./app/components/BikeCard)
  * [BikeTypeBadge/](./app/components/BikeTypeBadge)
  * [BottomSheetModal/](./app/components/BottomSheetModal)
  * [NavBarHeader/](./app/components/NavBarHeader)
  * [NavBarLeftItem/](./app/components/NavBarLeftItem)
  * [NavBarRightItem/](./app/components/NavBarRightItem)
  * [index.ts](./app/components/index.ts)
* [hooks/](./app/hooks)
  * [index.ts](./app/hooks/index.ts)
  * [useBikes.tsx](./app/hooks/useBikes.tsx)
* [models/](./app/models)
  * [Bike.ts](./app/models/Bike.ts)
  * [index.ts](./app/models/index.ts)
* [navigation/](./app/navigation)
  * [Main.tsx](./app/navigation/Main.tsx)
  * [index.ts](./app/navigation/index.ts)
* [screens/](./app/screens)
  * [Bikes/](./app/screens/Bikes)
  * [index.ts](./app/screens/index.ts)
* [App.tsx](./app/App.tsx)

