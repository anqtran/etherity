pragma solidity ^0.4.0;
contract Auction{
	struct Bid{
		address highestBidder;
		uint256 highestBid;
		address beneficiary;
	}
	mapping (string => Bid) biddingItems;
	

	event AuctionEnded(address winner, uint256 amount);
	event HighestBidIncreased(address bidder, uint256 amount);
	event BidSubmission(address indexed sender, uint256 amount);

	mapping(address => uint) balances;
	mapping (address => uint) public bids;
	// enum  BiddingStatus{Active, Inactive}

	modifier validPurchase() {
		require(msg.value > 0);
		_;
	}


	function addBid (string _id, address _beneficiary) public {
		Bid memory newBid = Bid(0, 0, _beneficiary);
		biddingItems[_id] = newBid;
	}
	

	function bid(string _itemId) public payable {
		Bid memory currentBid = biddingItems[_itemId];
		if (currentBid.highestBidder != 0x0) {
			currentBid.highestBidder.transfer(currentBid.highestBid);
		}

		// if (highestBidder != 0) {
			//           pendingReturns[highestBidder] += highestBid;
			//       }

			currentBid.highestBidder = msg.sender;
			currentBid.highestBid = msg.value;
			emit HighestBidIncreased(msg.sender, msg.value);
		}


		function release(string _itemId) public payable
		{
			Bid memory endedBid = biddingItems[_itemId];
			if (endedBid.highestBid == 0) return;
			uint256 amount = endedBid.highestBid;
			endedBid.beneficiary.transfer(amount);
		}
}