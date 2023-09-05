// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

struct NFTOffer {
    uint256 price;
    address creator;
    bool finished;
}

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;
    mapping(uint256 => NFTOffer) public offers;

    event Sell(address from, address to, uint256 tokenId, uint256 price);

    constructor() ERC721("MyNFTMarket", "MNM") {}

    function create(address recipient, string memory tokenURI) public {
        _safeMint(recipient, tokenIds.current());
        _setTokenURI(tokenIds.current(), tokenURI);
        tokenIds.increment();
    }

    function createOffer(uint256 tokenId, uint256 price) public {
        approve(address(this), tokenId);
        transferFrom(msg.sender, address(this), tokenId);
        offers[tokenId] = NFTOffer(price, msg.sender, false);
    }

    function buy(uint256 tokenId) public payable {
        NFTOffer storage offer = offers[tokenId];
        require(
            offer.finished == false,
            "NFTMarketplace: Offer already finished"
        );
        require(msg.value == offer.price, "NFTMarketplace: Incorret price");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenId);
        payable(offer.creator).transfer(msg.value);
        offer.finished = true;
        emit Sell(offer.creator, msg.sender, tokenId, offer.price);
    }

    function finishOffer(uint256 tokenId) public {
        NFTOffer storage offer = offers[tokenId];
        require(
            offer.finished == false,
            "NFTMarketplace: Offer already finished"
        );
        require(
            msg.sender == offer.creator,
            "NFTMarketplace: Only owner can modify this"
        );
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenId);
        offer.finished = true;
        emit Sell(offer.creator, address(0), tokenId, 0);
    }

}
