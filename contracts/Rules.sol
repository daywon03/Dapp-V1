// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Exmateria is ERC721A, Ownable(msg.sender){
    using Strings for uint;
    
    constructor() ERC721A("Ex-materia Collection", "EXM"){}

    //The total number of NFT
    uint private constant MAX_SUPPLY = 23;

    //The price of one NFT
    uint private constant PRICE = 0.0000001 ether;

    //base URI of the NFTs
    //Retenir les liens ipfs des NFTs
    string public baseURI;



    //@title mint
    //@notice Permit to the owner to deploy a collection of nft
    //@param _quantity Amount of the NFTs the owner want
    function mint(uint _quantity) external payable {
        require(msg.value >= PRICE * _quantity, "Not enough funds");
        require(totalSupply() + _quantity <= MAX_SUPPLY, "Max supply exceed");
        _safeMint(msg.sender,_quantity);
    }

    //@notice get the token URI of an NFT by his ID
    //@param _tokenID The ID of the NFT you want to have the URI

    function tokenURI(uint _tokenID) public view virtual override returns (string memory){
        require(_exists(_tokenID), "URI query for non existent token");
        return string(abi.encodePacked(baseURI, _tokenID.toString(),".json"));
    
    }

    //@notice change the base URI of the NFTs
    //@param _baseURI The new base URI of the NFTs
    function setBaseUri(string memory _baseURI) external onlyOwner{
        baseURI = _baseURI;
    } 

    //@notice Get Paid 
    function withdraw() public payable onlyOwner{
        (bool callSuccess,)=payable (owner()).call{value: address(this).balance}("");
        require(callSuccess);
    }


}