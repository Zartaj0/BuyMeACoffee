async function main (){
    const [deployer] = await hre.ethers.getSigners();

    //Get the contracts to deploy 
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    //deploy the contracts
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();
    console.log(buyMeACoffee.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });