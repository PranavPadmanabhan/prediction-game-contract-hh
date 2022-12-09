/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Token, TokenInterface } from "../../contracts/Token";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cap",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "Token__Withdraw_Error",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "miner",
        type: "address",
      },
    ],
    name: "Minted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b50604051620021f7380380620021f7833981810160405281019062000037919062000316565b620000476200017860201b60201c565b600a620000559190620003fd565b816200006291906200053a565b6040518060400160405280600581526020017f544f4b454e0000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f544b4e00000000000000000000000000000000000000000000000000000000008152508160039080519060200190620000e69291906200024f565b508060049080519060200190620000ff9291906200024f565b5050506000811162000148576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200013f906200036f565b60405180910390fd5b80608081815250505062000171620001656200018160201b60201c565b6200018960201b60201c565b506200069b565b60006012905090565b600033905090565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8280546200025d90620005b2565b90600052602060002090601f016020900481019282620002815760008555620002cd565b82601f106200029c57805160ff1916838001178555620002cd565b82800160010185558215620002cd579182015b82811115620002cc578251825591602001919060010190620002af565b5b509050620002dc9190620002e0565b5090565b5b80821115620002fb576000816000905550600101620002e1565b5090565b600081519050620003108162000681565b92915050565b6000602082840312156200032f576200032e62000646565b5b60006200033f84828501620002ff565b91505092915050565b60006200035760158362000391565b9150620003648262000658565b602082019050919050565b600060208201905081810360008301526200038a8162000348565b9050919050565b600082825260208201905092915050565b6000808291508390505b6001851115620003f457808604811115620003cc57620003cb620005e8565b5b6001851615620003dc5780820291505b8081029050620003ec856200064b565b9450620003ac565b94509492505050565b60006200040a826200059b565b91506200041783620005a5565b9250620004467fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84846200044e565b905092915050565b60008262000460576001905062000533565b8162000470576000905062000533565b81600181146200048957600281146200049457620004ca565b600191505062000533565b60ff841115620004a957620004a8620005e8565b5b8360020a915084821115620004c357620004c2620005e8565b5b5062000533565b5060208310610133831016604e8410600b8410161715620005045782820a905083811115620004fe57620004fd620005e8565b5b62000533565b620005138484846001620003a2565b925090508184048111156200052d576200052c620005e8565b5b81810290505b9392505050565b600062000547826200059b565b915062000554836200059b565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161562000590576200058f620005e8565b5b828202905092915050565b6000819050919050565b600060ff82169050919050565b60006002820490506001821680620005cb57607f821691505b60208210811415620005e257620005e162000617565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b60008160011c9050919050565b7f45524332304361707065643a2063617020697320300000000000000000000000600082015250565b6200068c816200059b565b81146200069857600080fd5b50565b608051611b40620006b760003960006105570152611b406000f3fe6080604052600436106100fe5760003560e01c80633ccfd60b1161009557806395d89b411161006457806395d89b4114610306578063a457c2d714610331578063a9059cbb1461036e578063dd62ed3e146103ab578063f2fde38b146103e8576100fe565b80633ccfd60b1461027057806370a0823114610287578063715018a6146102c45780638da5cb5b146102db576100fe565b806323b872dd116100d157806323b872dd146101a0578063313ce567146101dd578063355274ea146102085780633950935114610233576100fe565b806306fdde0314610103578063095ea7b31461012e5780631249c58b1461016b57806318160ddd14610175575b600080fd5b34801561010f57600080fd5b50610118610411565b60405161012591906114a9565b60405180910390f35b34801561013a57600080fd5b5061015560048036038101906101509190611205565b6104a3565b604051610162919061148e565b60405180910390f35b6101736104c6565b005b34801561018157600080fd5b5061018a610511565b604051610197919061162b565b60405180910390f35b3480156101ac57600080fd5b506101c760048036038101906101c291906111b2565b61051b565b6040516101d4919061148e565b60405180910390f35b3480156101e957600080fd5b506101f261054a565b6040516101ff9190611646565b60405180910390f35b34801561021457600080fd5b5061021d610553565b60405161022a919061162b565b60405180910390f35b34801561023f57600080fd5b5061025a60048036038101906102559190611205565b61057b565b604051610267919061148e565b60405180910390f35b34801561027c57600080fd5b506102856105b2565b005b34801561029357600080fd5b506102ae60048036038101906102a99190611145565b610678565b6040516102bb919061162b565b60405180910390f35b3480156102d057600080fd5b506102d96106c0565b005b3480156102e757600080fd5b506102f06106d4565b6040516102fd9190611473565b60405180910390f35b34801561031257600080fd5b5061031b6106fe565b60405161032891906114a9565b60405180910390f35b34801561033d57600080fd5b5061035860048036038101906103539190611205565b610790565b604051610365919061148e565b60405180910390f35b34801561037a57600080fd5b5061039560048036038101906103909190611205565b610807565b6040516103a2919061148e565b60405180910390f35b3480156103b757600080fd5b506103d260048036038101906103cd9190611172565b61082a565b6040516103df919061162b565b60405180910390f35b3480156103f457600080fd5b5061040f600480360381019061040a9190611145565b6108b1565b005b60606003805461042090611766565b80601f016020809104026020016040519081016040528092919081815260200182805461044c90611766565b80156104995780601f1061046e57610100808354040283529160200191610499565b820191906000526020600020905b81548152906001019060200180831161047c57829003601f168201915b5050505050905090565b6000806104ae610935565b90506104bb81858561093d565b600191505092915050565b6104d833678ac7230489e80000610b08565b7f90ddedd5a25821bba11fbb98de02ec1f75c1be90ae147d6450ce873e7b78b5d8336040516105079190611473565b60405180910390a1565b6000600254905090565b600080610526610935565b9050610533858285610b72565b61053e858585610bfe565b60019150509392505050565b60006012905090565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b600080610586610935565b90506105a7818585610598858961082a565b6105a29190611688565b61093d565b600191505092915050565b6105ba610e76565b60006105c46106d4565b905060008173ffffffffffffffffffffffffffffffffffffffff16476040516105ec9061145e565b60006040518083038185875af1925050503d8060008114610629576040519150601f19603f3d011682016040523d82523d6000602084013e61062e565b606091505b505090508061067457816040517feb0c354c00000000000000000000000000000000000000000000000000000000815260040161066b9190611473565b60405180910390fd5b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6106c8610e76565b6106d26000610ef4565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461070d90611766565b80601f016020809104026020016040519081016040528092919081815260200182805461073990611766565b80156107865780601f1061075b57610100808354040283529160200191610786565b820191906000526020600020905b81548152906001019060200180831161076957829003601f168201915b5050505050905090565b60008061079b610935565b905060006107a9828661082a565b9050838110156107ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e5906115eb565b60405180910390fd5b6107fb828686840361093d565b60019250505092915050565b600080610812610935565b905061081f818585610bfe565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6108b9610e76565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610929576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610920906114eb565b60405180910390fd5b61093281610ef4565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156109ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109a4906115cb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a1d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a149061150b565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610afb919061162b565b60405180910390a3505050565b610b10610553565b81610b19610511565b610b239190611688565b1115610b64576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5b906115ab565b60405180910390fd5b610b6e8282610fba565b5050565b6000610b7e848461082a565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610bf85781811015610bea576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610be19061152b565b60405180910390fd5b610bf7848484840361093d565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c6e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c659061158b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610cde576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd5906114cb565b60405180910390fd5b610ce9838383611111565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610d6f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d669061154b565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e5d919061162b565b60405180910390a3610e70848484611116565b50505050565b610e7e610935565b73ffffffffffffffffffffffffffffffffffffffff16610e9c6106d4565b73ffffffffffffffffffffffffffffffffffffffff1614610ef2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee99061156b565b60405180910390fd5b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561102a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110219061160b565b60405180910390fd5b61103660008383611111565b80600260008282546110489190611688565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516110f9919061162b565b60405180910390a361110d60008383611116565b5050565b505050565b505050565b60008135905061112a81611adc565b92915050565b60008135905061113f81611af3565b92915050565b60006020828403121561115b5761115a6117f6565b5b60006111698482850161111b565b91505092915050565b60008060408385031215611189576111886117f6565b5b60006111978582860161111b565b92505060206111a88582860161111b565b9150509250929050565b6000806000606084860312156111cb576111ca6117f6565b5b60006111d98682870161111b565b93505060206111ea8682870161111b565b92505060406111fb86828701611130565b9150509250925092565b6000806040838503121561121c5761121b6117f6565b5b600061122a8582860161111b565b925050602061123b85828601611130565b9150509250929050565b61124e816116de565b82525050565b61125d816116f0565b82525050565b600061126e82611661565b6112788185611677565b9350611288818560208601611733565b611291816117fb565b840191505092915050565b60006112a9602383611677565b91506112b48261180c565b604082019050919050565b60006112cc602683611677565b91506112d78261185b565b604082019050919050565b60006112ef602283611677565b91506112fa826118aa565b604082019050919050565b6000611312601d83611677565b915061131d826118f9565b602082019050919050565b6000611335602683611677565b915061134082611922565b604082019050919050565b6000611358602083611677565b915061136382611971565b602082019050919050565b600061137b602583611677565b91506113868261199a565b604082019050919050565b600061139e601983611677565b91506113a9826119e9565b602082019050919050565b60006113c160008361166c565b91506113cc82611a12565b600082019050919050565b60006113e4602483611677565b91506113ef82611a15565b604082019050919050565b6000611407602583611677565b915061141282611a64565b604082019050919050565b600061142a601f83611677565b915061143582611ab3565b602082019050919050565b6114498161171c565b82525050565b61145881611726565b82525050565b6000611469826113b4565b9150819050919050565b60006020820190506114886000830184611245565b92915050565b60006020820190506114a36000830184611254565b92915050565b600060208201905081810360008301526114c38184611263565b905092915050565b600060208201905081810360008301526114e48161129c565b9050919050565b60006020820190508181036000830152611504816112bf565b9050919050565b60006020820190508181036000830152611524816112e2565b9050919050565b6000602082019050818103600083015261154481611305565b9050919050565b6000602082019050818103600083015261156481611328565b9050919050565b600060208201905081810360008301526115848161134b565b9050919050565b600060208201905081810360008301526115a48161136e565b9050919050565b600060208201905081810360008301526115c481611391565b9050919050565b600060208201905081810360008301526115e4816113d7565b9050919050565b60006020820190508181036000830152611604816113fa565b9050919050565b600060208201905081810360008301526116248161141d565b9050919050565b60006020820190506116406000830184611440565b92915050565b600060208201905061165b600083018461144f565b92915050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b60006116938261171c565b915061169e8361171c565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156116d3576116d2611798565b5b828201905092915050565b60006116e9826116fc565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015611751578082015181840152602081019050611736565b83811115611760576000848401525b50505050565b6000600282049050600182168061177e57607f821691505b60208210811415611792576117916117c7565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332304361707065643a2063617020657863656564656400000000000000600082015250565b50565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b611ae5816116de565b8114611af057600080fd5b50565b611afc8161171c565b8114611b0757600080fd5b5056fea26469706673582212208d30dea85bb1da6ffb9a56d49e0089f0449bdd1a0877d6409f11eb666d3f9c3f64736f6c63430008070033";

type TokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Token__factory extends ContractFactory {
  constructor(...args: TokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    cap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Token> {
    return super.deploy(cap, overrides || {}) as Promise<Token>;
  }
  override getDeployTransaction(
    cap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(cap, overrides || {});
  }
  override attach(address: string): Token {
    return super.attach(address) as Token;
  }
  override connect(signer: Signer): Token__factory {
    return super.connect(signer) as Token__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenInterface {
    return new utils.Interface(_abi) as TokenInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Token {
    return new Contract(address, _abi, signerOrProvider) as Token;
  }
}
