// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Messenger is Ownable {

    string public message;
    uint public counter;

    event messageRead (address reader, uint timestamp);
    event messageEdited (uint timestamp);

    constructor(string memory _message) {
        message = _message;
    }

    function getMessage() external view returns(string memory) {
        return message;
    }

    function setMessage(string memory _message) external onlyOwner {
        message = _message;
        counter++;

        emit messageEdited(block.timestamp);
    }

}
