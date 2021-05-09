// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract GameItem is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("GameItem", "GIM") {}

    //override.
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://contract-abis.herokuapp.com/api/token/";
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    //for opensea
    function baseTokenURI() public pure returns (string memory) {
        return "https://contract-abis.herokuapp.com/api/token/";
    }

    //for opensea
    function contractURI() public pure returns (string memory) {
        return "https://contract-abis.herokuapp.com/api/contract/";
    }

    function mintItem(address player, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function mintItemVoid(address player)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        string memory baseURI = _baseURI();
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, baseURI);
        return newItemId;
    }
    
    function transferItem(address player, uint256 tokenId) public  onlyOwner {
        _safeTransfer(msg.sender, player, tokenId, "");
    }
}
