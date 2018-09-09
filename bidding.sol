pragma solidity ^0.4.0;
contract Auction{
	struct Bid{
		address latestBidder;
		uint256 latestBid;
		uint auctionEnd;
	}

	address public beneficiary;
	bool ended;
	event AuctionEnded(address winner, uint256 amount);
	event HighestBidIncreased(address bidder, uint256 amount);
	event BidSubmission(address indexed sender, uint256 amount);

	
    constructor(
        address _beneficiary
    ) public {
        beneficiary = _beneficiary;
    }

	mapping(address => uint) balances;
	mapping (address => uint) public bids;
	// enum  BiddingStatus{Active, Inactive}

	modifier validPurchase() {
		require(msg.value > 0);
	}


	function bid() public payable {
		require(now <= auctionEnd,
			"Bidding already ended!")

		require(msg.value > latestBid);

		if (latestBidder != 0x0) {
			latestBidder.transfer(latestBid);
		}

		// if (highestBidder != 0) {
			//           pendingReturns[highestBidder] += highestBid;
			//       }

			latestBidder = msg.sender;
			latestBid = msg.value;
		}
		emit HighestBidIncreased(msg.sender, msg.value);

		function refund(uint256 amount) public {
			require(amount > 0 && amount <= balances[msg.sender]);

			balances[msg.sender] -= amount;

			msg.sender.transfer(amount);
		}


		/// @dev Allows to send a bid to the auction
		/// @param receiver address Bid will be assigned to this address
		function release(address receiver) public payable
		validPurchase()
		returns (uint amount)
		{
			if(hasReachedEndBlock()) {
				finalizeAuction();
				return;
			}

			amount = msg.value;
			wallet.transfer(amount);
			bids[receiver] += amount;
			totalReceived = totalReceived + amount;
			BidSubmission(receiver, amount);



			function auctionEnd() public{
				//conditions
				require(now >= auctionEnd, "Bidding not yet ended.");

				//effects
				ended = true;
				emit AuctionEnded(highestBidder, highestBid);

				//interaction
				beneficiary.transfer(highestBid);
			}

		}