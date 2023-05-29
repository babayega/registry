// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Registry {
    //
    // Enums
    //
    enum Status {
        Unregistered,
        Registered,
        Resigned
    }

    //
    // Storage
    //

    /// @notice A mapping to store the current registration status of users
    mapping(address => Status) public userStatus;

    //
    // Event
    //

    /// @notice An event emitted when the registration status of a user changes
    event UserAction(address indexed user, Status status);

    /// @notice Registers the user
    /// @dev Emits a UserAction event with the Registered status
    function register() public {
        Status currStatus = userStatus[msg.sender];
        require(currStatus != Status.Registered, "already registered");

        emit UserAction(msg.sender, Status.Registered);

        userStatus[msg.sender] = Status.Registered;
    }

    /// @notice Unregisters the user
    /// @dev Emits a UserAction event with the Unregistered status
    function unregister() public {
        Status currStatus = userStatus[msg.sender];
        require(currStatus != Status.Unregistered, "already unregistered");

        emit UserAction(msg.sender, Status.Unregistered);

        userStatus[msg.sender] = Status.Unregistered;
    }

    /// @notice Resigns the user
    /// @dev Emits a UserAction event with the Resigned status
    function resign() public {
        Status currStatus = userStatus[msg.sender];
        require(currStatus != Status.Resigned, "already resigned");

        emit UserAction(msg.sender, Status.Resigned);

        userStatus[msg.sender] = Status.Resigned;
    }
}
