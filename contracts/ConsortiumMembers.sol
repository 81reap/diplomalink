pragma solidity ^0.8.0;

contract ConsortiumMembers {
    mapping(address => bool) public members;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function addMember(address _member) public onlyAdmin {
        members[_member] = true;
    }

    function removeMember(address _member) public onlyAdmin {
        members[_member] = false;
    }

    function isMember(address _member) public view returns (bool) {
        return members[_member];
    }
}