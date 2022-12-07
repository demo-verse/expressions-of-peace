// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

//////////////////////////////////////////////////////////////////////
// in V3
// we'll be introducing two new fields: full_name and nick_name
// and re-interpret the just_express function
// from EoPV1 and EoPV2 contracts as express_as_anonymous_world_resident
// country_code corresponds to ISO codes :  https://www.countrycode.org/
//////////////////////////////////////////////////////////////////////
// in the next one, we'll make 1:N cardinality in person:citizenship relation,
// meaning people can include their multi-nationality if they had.

// also, will start increasing accessibility of expressions from 4th or 5th versions, 
// meaning more multimedia (probably as their urls to ipfs) types will be supported.
// -- maybe would start using the NFT metadata specification at this stage, 
// or if it is articulated till then, the protocol itself, Proof of Peacemaking
//////////////////////////////////////////////////////////////////////

contract ExpressionOfPeaceV3 {
    struct Expression {
        string expression_txt;
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
        expr.expression_txt = _expression_txt;
        expr.full_name = _full_name;
        expr.nick_name = _nick_name;
    }

    function express_as_citizen(
        string memory _expression_txt,
        string memory _country_code,
        string memory _full_name,
        string memory _nick_name
    ) public {
        expr.expression_txt = _expression_txt;
        expr.country_code = _country_code;
        expr.full_name = _full_name;
        expr.nick_name = _nick_name;
    }

    function express_as_anon_citizen(
        string memory _expression_txt,
        string memory _country_code
    ) public {
        expr.expression_txt = _expression_txt;
        expr.country_code = _country_code;
    }

    function express_as_world_resident(
        string memory _expression_txt,
        string memory _full_name,
        string memory _nick_name
    ) public {
        expr.expression_txt = _expression_txt;
        expr.full_name = _full_name;
        expr.nick_name = _nick_name;
    }

      // writing an expression via this function
    //is a behaviour of an anonymous world resident .

    function express_as_anonymous_world_resident(string memory _expression_txt)
        public
    {
        expr.expression_txt = _expression_txt;
    }

    function read() public view returns (Expression memory) {
        return expr;
    }
}
