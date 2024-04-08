pragma solidity ^0.8.0;

import "./ConsortiumMembers.sol";

contract ConsortiumBlockchain {
    ConsortiumMembers public consortiumMembers;
    mapping(bytes32 => bool) public validatedAnswers;
    mapping(address => bool) public publicNodes;

    constructor(address _consortiumMembersAddress) {
        consortiumMembers = ConsortiumMembers(_consortiumMembersAddress);
    }

    modifier onlyConsortiumMember() {
        require(consortiumMembers.isMember(msg.sender), "Only consortium members can perform this action");
        _;
    }

    modifier onlyPublicNode() {
        require(publicNodes[msg.sender], "Only public nodes can perform this action");
        _;
    }

    function addPublicNode(address _node) public onlyConsortiumMember {
        publicNodes[_node] = true;
    }

    function removePublicNode(address _node) public onlyConsortiumMember {
        publicNodes[_node] = false;
    }

    function submitAnswers(bytes32 _answersHash) public onlyPublicNode {
        validatedAnswers[_answersHash] = true;
    }

    function isValidated(bytes32 _answersHash) public view returns (bool) {
        return validatedAnswers[_answersHash];
    }
}