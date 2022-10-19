async function balances (address) {
 const balance = await hre.ethers.provider.getBalance(address);
 return hre.ethers.utils.formatEther(balance);
} 

async function printBalance(addresses){
  let i = 0;
 for(const address of addresses){
  console.log("HERE WE GOOOO",await balances(address));
  i++;
 }
}

async function printMemos(memos) {
   for(const memo of memos){
    const name = memo.name;
    const timestamp = memo.timestamp 
    const from = memo.from;
    const message =memo.message;
    console.log(`${name} at ${timestamp} with address ${from} said "${message}"`);
   }
}

async function main() {

  //Get examples accounts
  const [deployer,user1,user2,user3] = await hre.ethers.getSigners();

  //Get the contracts to deploy 
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  //deploy the contracts
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();

  //check balances before coffee purchase
  printBalance([deployer.address,user1.address,user2.address,user3.address])

  //buy onwner a coffee
  await buyMeACoffee.connect(user1).buyCoffee("Robin","hope you loved the coffee",{ value: ethers.utils.parseEther("1") });
  await buyMeACoffee.connect(user2).buyCoffee("sonu","hope you loved the coffee",{ value: ethers.utils.parseEther("1") });
  await buyMeACoffee.connect(user3).buyCoffee("rahul","hope you loved the coffee",{ value: ethers.utils.parseEther("1") });

  //check balance after the coffee purchase 
  await printBalance([deployer.address,user1.address,user2.address,user3.address])

  //withdraw funds
  await buyMeACoffee.withdrawTip();

  //check balance after withdraw
  await printBalance([deployer.address,buyMeACoffee.address])

  //read them memos
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);

  
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
