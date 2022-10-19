// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract BuyMeACoffee{
    //Event for a memo, sent the by person who is sending ether
    event NewMemo(address indexed from,uint timestamp,string name, string message);
    //struct for storing the message,name, time,and the address that sent the eth
    struct Memo {
        address from;
        uint timestamp;
        string name;
        string message;
    }
    
   //storing the memo in an array
    Memo[] memos ;

    address payable owner;
    
    constructor (){
        owner = payable(msg.sender);
    }

    function ownerAddress()public view  returns(address) {
        return owner;
    }

    function changeOwner(address newOwner) public {
        require(msg.sender == owner,"only owner can call this");
        owner = payable(newOwner);
    }

    /**
     * @dev Send eth to this function 
     * @param name name of the person who is sending the eth.
     * @param message any message that person wanna send.
     */

    function buyCoffee(string memory name, string memory message ) public payable {
      require(msg.value>0,"can't buy coffee with 0 eth");
     ///push the details into the array 
      memos.push(Memo(
        msg.sender,
        block.timestamp,
        name,
        message
      ));

      emit NewMemo(msg.sender,block.timestamp, name, message);

     }

    /**
     * @dev Send all the amount to the owner
     */

    function withdrawTip () public {
        require(msg.sender == owner,"only owner can call this");
        (bool sent, ) = owner.call{value:address(this).balance}("");
        require(sent,"transaction failed ");
    }

    /**
     * @dev Get the array of memos received. 
     */
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }  
}