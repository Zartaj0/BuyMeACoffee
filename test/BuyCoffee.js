const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BuyCoffee", async function () {
  let deployer;
  let BuyMeACoffee ;
  let buyMeACoffee;

  this.beforeEach(async function (){
     [deployer,user] = await hre.ethers.getSigners();
     BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
     buyMeACoffee = await BuyMeACoffee.deploy();
  
    await buyMeACoffee.deployed();
  })

  
  describe("Deployment", function () {
    it("Should set msg.sender as owner", async function () {
      expect( await buyMeACoffee.ownerAddress()).to.be.equal(deployer.address);
       
    });

    it("Should set the right new owner", async function () {
        await expect(buyMeACoffee.connect(user).changeOwner(user.address)).to.be.rejected;
       expect(await buyMeACoffee.ownerAddress()).to.be.equal(deployer.address);
      
    });

  //   it("Should receive and store the funds to lock", async function () {
      
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
     
  //   });
  // });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
        
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
        
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
        
  //     });
  //   });
   });
});
