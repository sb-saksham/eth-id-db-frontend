// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {StringUtils} from "./StringUtils.sol";

contract IdDb {
    struct Info {
        string name;
    }
    address payable public owner;
    mapping(address => bool) public verifiedAddresses;
    mapping(string => bool) public verifiedDomains;
    mapping(string => address) public domains;
    mapping(address => Info) public infodb;

    error InvalidName(string name);

    function price(string calldata name) public pure returns (uint256) {
        uint256 len = StringUtils.strlen(name);
        require(len > 0, "Domain Name cannot be left NULL");
        if (len == 2) {
            //if length is less price is more
            return 5 * 10 ** 15; //0.05 ETH
        } else if (len == 3) {
            return 4 * 10 ** 15; //0.04 ETH
        } else if (len == 4) {
            return 3 * 10 ** 15; //0.03 ETH
        } else if (len == 5) {
            return 2 * 10 ** 15; //0.02 ETH
        } else {
            return 10 ** 15; // 0.01 ETH
        }
    }

    function valid(string calldata name) public pure returns (bool) {
        return StringUtils.strlen(name) >= 3 && StringUtils.strlen(name) <= 15;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function verify(
        string calldata dname,
        string calldata _name
    ) public onlyOwner {
        require(domains[dname] != address(0), "Domain Not Registered");
        require(!verifiedAddresses[domains[dname]], "Already verified");
        require(!verifiedDomains[dname], "Already verified");
        infodb[domains[dname]] = Info(_name);
        verifiedAddresses[domains[dname]] = true;
        verifiedDomains[dname] = true;
    }

    function registerDomain(string calldata name) public payable {
        require(msg.value >= price(name), "Not enough fees paid!");
        require(domains[name] == address(0), "Domain Already exists");
        if (!valid(name)) revert InvalidName(name);
        domains[name] = msg.sender;
        verifiedAddresses[msg.sender] = false;
        verifiedDomains[name] = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can perform this function!");
        _;
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;

        (bool success, ) = msg.sender.call{value: amount}(""); //The ("") is used when we need to pass a payload mainly to call a function in another smart contract
        require(success, "Failed to withdraw funds!");
    }

    receive() external payable {}
}
