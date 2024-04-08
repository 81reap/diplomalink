const { expect } = require("chai");
const { utils } = require("hardhat");

describe("ConsortiumBlockchain", function () {
  let consortiumMembers;
  let consortiumBlockchain;
  let admin;
  let publicNode;
  let user;

  beforeEach(async function () {
    const ConsortiumMembers = await ethers.getContractFactory("ConsortiumMembers");
    consortiumMembers = await ConsortiumMembers.deploy();

    const ConsortiumBlockchain = await ethers.getContractFactory("ConsortiumBlockchain");
    consortiumBlockchain = await ConsortiumBlockchain.deploy(await consortiumMembers.getAddress());

    [admin, publicNode, user] = await ethers.getSigners();

    await consortiumMembers.addMember(await admin.getAddress());
    await consortiumBlockchain.connect(admin).addPublicNode(await publicNode.getAddress());
  });

  it("should allow consortium members to add and remove public nodes", async function () {
    await expect(consortiumBlockchain.connect(user).addPublicNode(user.address)).to.be.revertedWith(
      "Only consortium members can perform this action"
    );

    await consortiumBlockchain.connect(admin).addPublicNode(user.address);
    expect(await consortiumBlockchain.publicNodes(user.address)).to.equal(true);

    await consortiumBlockchain.connect(admin).removePublicNode(user.address);
    expect(await consortiumBlockchain.publicNodes(user.address)).to.equal(false);
  });

  it("should allow public nodes to submit answers for validation", async function () {
    const answersHash = ethers.keccak256(ethers.toUtf8Bytes("test answers"));

    await expect(consortiumBlockchain.connect(user).submitAnswers(answersHash)).to.be.revertedWith(
      "Only public nodes can perform this action"
    );

    await consortiumBlockchain.connect(publicNode).submitAnswers(answersHash);
    expect(await consortiumBlockchain.isValidated(answersHash)).to.equal(true);
  });
});