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
  * [Calendar/](./app/components/Calendar)
  * [sharedStyles.ts](./app/components/sharedStyles.ts)
  * [index.ts](./app/components/index.ts)
* [hooks/](./app/hooks)
  * [index.ts](./app/hooks/index.ts)
  * [useAvailableBikes.ts](./app/hooks/useAvailableBikes.ts)
  * [useRentAmount.tsx](./app/hooks/useRentAmount.tsx)
  * [useBooking.tsx](./app/hooks/useBooking.tsx)
  * [useReturnBike.tsx](./app/hooks/useReturnBike.tsx)
* [models/](./app/models)
  * [Bike.ts](./app/models/Bike.ts)
  * [index.ts](./app/models/index.ts)
* [navigation/](./app/navigation)
  * [Main.tsx](./app/navigation/Main.tsx)
  * [index.ts](./app/navigation/index.ts)
* [screens/](./app/screens)
  * [Bikes/](./app/screens/Bikes)
    * [Bikes.tsx](./app/screens/Bikes/Bikes.tsx)
    * [styles.ts](./app/screens/Bikes/styles.ts)
  * [Booking/](./app/screens/Booking)
    * [Booking.tsx](./app/screens/Booking/Booking.tsx)
    * [styles.ts](./app/screens/Booking/styles.ts)
  * [index.ts](./app/screens/index.ts)
* [services/](./app/services)
  * [bikeApi.ts](./app/services/bikeApi.ts)
* [stores/](./app/stores)
  * [availableBikes/](./app/stores/availableBikes)
    * [slice.ts](./app/stores/availableBikes/slice.ts)
    * [types.ts](./app/stores/availableBikes/types.ts)
  * [rentAmount/](./app/stores/rentAmount)
    * [slice.ts](./app/stores/rentAmount/slice.ts)
    * [types.ts](./app/stores/rentAmount/types.ts)
  * [booking/](./app/stores/booking)
    * [slice.ts](./app/stores/booking/slice.ts)
    * [types.ts](./app/stores/booking/types.ts)
  * [returnBike/](./app/stores/returnBike)
    * [slice.ts](./app/stores/returnBike/slice.ts)
    * [types.ts](./app/stores/returnBike/types.ts)
* [store.ts](./app/store.ts)
* [App.tsx](./app/App.tsx)

