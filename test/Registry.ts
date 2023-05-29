import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Registry } from "../typechain-types/Registry";

describe("Registry", function () {
  let registry: Registry;
  let fu: SignerWithAddress,
    su: SignerWithAddress,
    tu: SignerWithAddress

  async function deployRegistry() {
    [fu, su, tu] = await ethers.getSigners();

    const Registry = await ethers.getContractFactory("Registry");
    registry = await Registry.deploy() as Registry;
  }

  describe("Register", function () {
    beforeEach(async function () {
      await deployRegistry();
    });

    it("Should be able to register", async function () {
      await registry.connect(fu).register();

      expect(await registry.userStatus(fu.address)).to.eq(1);

      const mess = await fu.signMessage(fu.address)
      console.log(fu.address, mess)

      console.log(ethers.utils.verifyMessage(fu.address, mess))
    });

    it("Should revert because already registered", async function () {
      await registry.connect(fu).register();

      await expect(registry.connect(fu).register()).to.be.revertedWith('already registered');
    });
  });

  describe("Unregister", function () {
    beforeEach(async function () {
      await deployRegistry();
    });

    it("Should be able to unregister", async function () {
      await registry.connect(fu).register();
      await registry.connect(fu).unregister();

      expect(await registry.userStatus(fu.address)).to.eq(0);
    });

    it("Should revert because already unregistered", async function () {
      await expect(registry.connect(fu).unregister()).to.be.revertedWith('already unregistered');
    });
  });

  describe("Resign", function () {
    beforeEach(async function () {
      await deployRegistry();
    });

    it("Should be able to resign", async function () {
      await registry.connect(fu).resign();

      expect(await registry.userStatus(fu.address)).to.eq(2);
    });

    it("Should revert because already resigned", async function () {
      await registry.connect(fu).resign();

      await expect(registry.connect(fu).resign()).to.be.revertedWith('already resigned');
    });
  });
});
