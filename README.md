# DiplomaLink
UNICC-Columbia University Thinkathon 2024 Project :: Team The Great Lake Thinktank

DiplomaLink is a decentralized solution that leverages blockchain technology to securely validate and store test answers to grant diplomas or certificates at an multinational level. It consists a network of consortium members who work together to ensure the integrity and accuracy of the test answer validation process. The use of smart contracts enforces access control and enables transparent and tamper-proof storage of validated test answers on the blockchain.


## Install and Setup

```bash
$ bun install --save-dev hardhat @nomicfoundation/hardhat-toolbox
$ bunx hardhat compile
$ bunx hardhat test
```

## More Information

### Nodes

1. Public Nodes :: Public nodes are responsible for the initial validation of test answers. They receive the test answers submitted by users and independently validate them against the predefined answer key. Each public node performs its own validation and shares the results with the other public nodes. If all the public nodes reach a consensus on the validity of the test answers, they notify the consortium members to proceed with the final validation and contract creation.
2. Consortium Members :: Consortium members are trusted entities with write access to create blockchain contracts. They receive the validated test answers from the public nodes and perform a final validation. If the consortium members confirm the validity of the test answers, they proceed to create the necessary blockchain contracts to store the test answers and their validation status.
 
### Smart Contracts   

- ConsortiumMembers.sol: This contract manages the membership of the consortium. It allows adding and removing consortium members and provides functions to check the membership status of an address.
- ConsortiumBlockchain.sol: This contract handles the core functionality of the consortium blockchain. It allows consortium members to submit answer keys, public nodes to submit test answers for validation, and consortium members to approve and execute transactions based on the validation results.

### Proof of Answer Consensus

1. Public Node Validation:
  - Public nodes receive test answers submitted by users.
  - Each public node independently validates the test answers against the predefined answer key.
  - Public nodes share their validation results with each other.
  - If all public nodes reach a consensus on the validity of the test answers, they notify the consortium members.
2. Consortium Member Validation:
  - Consortium members receive the validated test answers from the public nodes.
  - They perform a final validation to ensure the accuracy and integrity of the test answers.
  - If the consortium members confirm the validity of the test answers, they proceed to the contract creation stage.
3. Contract Creation:
  - Consortium members use their write access to create blockchain contracts.
  - They deploy the ConsortiumMembers contract to manage the consortium membership.
  - They deploy the ConsortiumBlockchain contract to handle the test answer validation and storage.
  - The ConsortiumBlockchain contract is initialized with the address of the ConsortiumMembers contract.
4. Test Answer Submission and Validation:
  - Public nodes submit test answers to the ConsortiumBlockchain contract for validation.
  - The contract verifies that the submitter is a valid public node.
  - Consortium members approve the submitted test answers if they pass the validation criteria.
  - If a sufficient number of consortium members approve the test answers, the contract marks them as validated and stores them on the blockchain.
5. Test Answer Retrieval:
  - Users can retrieve the validated test answers from the ConsortiumBlockchain contract.
  - The contract ensures that only validated test answers are accessible.
