// SPDX-License-Identifier: UNDEFINED

pragma solidity >=0.7.0 <0.9.0;
contract valueChecker
{
    uint price=10;
    event valueEvent (bool returnValue);
    function sendMatcher (uint8 x) public {
        if(x>price)
            emit valueEvent(true);
        else 
            emit valueEvent(false);
    }
    function callMatcher (uint8 x) public view returns(bool){
        if(x>price)
            return true;
        else
            return false;
    }
}