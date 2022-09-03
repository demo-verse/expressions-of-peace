// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract ExpressionOfPeace {
    string current_expression;

    constructor(string memory _expression) {
        current_expression = _expression;
    }

    function set(string memory _expression) public {
        current_expression = _expression;
    }

    function get() public view returns (string memory) {
        return current_expression;
    }
}