// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// in V2, country-citizenship relation will be 1:1
// we'll be introducing two new fields: full_name and nick_name
// and re-interpret the just_express function
//from EoPV1 and EoPV2 contracts as express_as_anonymous_world_resident
// will be using ISO codes:  https://www.countrycode.org/

contract ExpressionOfPeaceV3 {
    struct Expression {
        string last_expression;
        string country_code;
        string full_name;
        string nick_name;
    }

    Expression expr;

    constructor(
        string memory _expression_txt,
        string memory _country_code,
        string memory _full_name,
        string memory _nick_name
    ) {
        expr.country_code = _country_code;
        expr.last_expression = _expression_txt;
        expr.full_name = _full_name;
        expr.nick_name = _nick_name;
    }

    // writing an expression via this function
    //is a behaviour of an anonymous world resident .
    function express_as_anonymous_world_resident(string memory _expression_txt)
        public
    {
        expr.last_expression = _expression_txt;
    }

    function express_as_citizen(
        string memory _expression_txt,
        string memory _country_code,
        string memory _full_name,
        string memory _nick_name
    ) public {
        expr.last_expression = _expression_txt;
        expr.country_code = _country_code;
        expr.full_name = _full_name;
        expr.nick_name = _nick_name;
    }

    function express_as_anon_citizen(
        string memory _expression_txt,
        string memory _country_code
    ) public {
        expr.last_expression = _expression_txt;
        expr.country_code = _country_code;
    }

    function express_as_world_resident(
        string memory _expression_txt,
        string memory _full_name,
        string memory _nick_name
    ) public {
        expr.last_expression = _expression_txt;
        expr.full_name = _full_name;
        expr.nick_name = _nick_name;
    }

    function read() public view returns (Expression memory) {
        return expr;
    }
}
