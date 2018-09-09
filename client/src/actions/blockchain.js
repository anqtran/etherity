export const addBid = async(data) => {
  const accounts =  web3.eth.getAccounts();
      await auction.methods.addbid(data._id, data.organization).send({
      });
};



export const bid = async(amount, itemId) => {
  const accounts =  web3.eth.getAccounts();
      await auction.methods.bid(itemId).send({
      	from: accounts[0],
      	value: amount
      });
};


export const release = async(itemId) => {
  const accounts =  web3.eth.getAccounts();
      await auction.methods.bid(itemId).send({
      });
};
