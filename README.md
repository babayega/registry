# Registry Contract

This is a smart contract that manages the registration status of users.

## Description

The `Registry` contract provides functionality to register, unregister, and resign users. Each user has a registration status represented by the `Status` enum, which can be one of the following values:

- `Unregistered`: The user is not registered.
- `Registered`: The user is registered.
- `Resigned`: The user has resigned.

The contract stores the current registration status of users in the `userStatus` mapping.

## Usage

### Register

To register as a user, call the `register` function. This function will check if the user is already registered and revert if so. On successful registration, a `UserAction` event will be emitted with the `Registered` status.

### Unregister

To unregister as a user, call the `unregister` function. This function will check if the user is already unregistered and revert if so. On successful unregistration, a `UserAction` event will be emitted with the `Unregistered` status.

### Resign

To resign as a user, call the `resign` function. This function will check if the user has already resigned and revert if so. On successful resignation, a `UserAction` event will be emitted with the `Resigned` status.