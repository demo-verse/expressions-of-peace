// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// in V1, country-citizenship relation will be 1:1
// will be using ISO codes:  https://www.countrycode.org/
// First deployed @ 4.9.22
// https://goerli.etherscan.io/address/0x82e4afb4c80f84ffa2c95af29293c538f96f726e

contract ExpressionOfPeaceV2 {
    struct Expression {
        string current_expression;
        string country_code;
    }

    Expression expr;

    constructor(string memory _expression, string memory _country_code) {
        expr.country_code = _country_code;
        expr.current_expression = _expression;
    }

    // expression can be with or without the mention of a citizenship info
    function just_express(string memory _expression) public {
        expr.current_expression = _expression;
    }

    function express_as_citizen(
        string memory _expression,
        string memory _country_code
    ) public {
        expr.current_expression = _expression;
        expr.country_code = _country_code;
    }

    function read() public view returns (Expression memory) {
        return expr;
    }
}
