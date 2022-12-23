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
import type {
  PredictionContract,
  PredictionContractInterface,
} from "../../contracts/PredictionContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "entranceFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interval",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "rewards",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Prediction__Limit_Exceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "Prediction__Not_Enough_Amount",
    type: "error",
  },
  {
    inputs: [],
    name: "Prediction__Refund_Error",
    type: "error",
  },
  {
    inputs: [],
    name: "Prediction__Reward_Failed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "ContestCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "ContestCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "predictedValue",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "predictedAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "difference",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "NewPrediction",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "getContest",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "priceFeedAddress",
            type: "address",
          },
        ],
        internalType: "struct PredictionContract.Contest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContests",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "priceFeedAddress",
            type: "address",
          },
        ],
        internalType: "struct PredictionContract.Contest[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntranceFee",
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
    name: "getInterval",
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
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
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
    inputs: [],
    name: "getLatestTimeStamp",
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
    name: "getNumOfContests",
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
    name: "getNumOfMaxPlayers",
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
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "getPredictions",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "predictedValue",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "predictedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "difference",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct PredictionContract.Prediction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "getResult",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "predictedValue",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "predictedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "difference",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct PredictionContract.Prediction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "getTotalBalance",
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
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "getWinners",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "_predictedValue",
        type: "int256",
      },
    ],
    name: "predict",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "refund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "predictedValue",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "predictedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "difference",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct PredictionContract.Prediction[]",
        name: "predictions",
        type: "tuple[]",
      },
    ],
    name: "sort",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "predictedValue",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "predictedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "difference",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct PredictionContract.Prediction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "predictedValue",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "predictedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "difference",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct PredictionContract.Prediction[]",
        name: "predictions",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "priceFeed",
        type: "address",
      },
    ],
    name: "updateDifference",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "predictedValue",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "predictedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "difference",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct PredictionContract.Prediction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405260646005553480156200001657600080fd5b5060405162002dba38038062002dba83398181016040528101906200003c9190620005c0565b426001819055508260808181525050836002908051906020019062000063929190620001c1565b508160a0818152505080600b90805190602001906200008492919062000250565b50620000956200009f60201b60201c565b5050505062000756565b60005b600280549050811015620001be5760006040518060400160405280600184620000cc91906200069f565b815260200160028481548110620000e857620000e7620006da565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050508080620001b59062000709565b915050620000a2565b50565b8280548282559060005260206000209081019282156200023d579160200282015b828111156200023c5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190620001e2565b5b5090506200024c9190620002a2565b5090565b8280548282559060005260206000209081019282156200028f579160200282015b828111156200028e57825182559160200191906001019062000271565b5b5090506200029e9190620002a2565b5090565b5b80821115620002bd576000816000905550600101620002a3565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200032582620002da565b810181811067ffffffffffffffff82111715620003475762000346620002eb565b5b80604052505050565b60006200035c620002c1565b90506200036a82826200031a565b919050565b600067ffffffffffffffff8211156200038d576200038c620002eb565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620003d082620003a3565b9050919050565b620003e281620003c3565b8114620003ee57600080fd5b50565b6000815190506200040281620003d7565b92915050565b60006200041f62000419846200036f565b62000350565b905080838252602082019050602084028301858111156200044557620004446200039e565b5b835b818110156200047257806200045d8882620003f1565b84526020840193505060208101905062000447565b5050509392505050565b600082601f830112620004945762000493620002d5565b5b8151620004a684826020860162000408565b91505092915050565b6000819050919050565b620004c481620004af565b8114620004d057600080fd5b50565b600081519050620004e481620004b9565b92915050565b600067ffffffffffffffff821115620005085762000507620002eb565b5b602082029050602081019050919050565b6000620005306200052a84620004ea565b62000350565b905080838252602082019050602084028301858111156200055657620005556200039e565b5b835b818110156200058357806200056e8882620004d3565b84526020840193505060208101905062000558565b5050509392505050565b600082601f830112620005a557620005a4620002d5565b5b8151620005b784826020860162000519565b91505092915050565b60008060008060808587031215620005dd57620005dc620002cb565b5b600085015167ffffffffffffffff811115620005fe57620005fd620002d0565b5b6200060c878288016200047c565b94505060206200061f87828801620004d3565b93505060406200063287828801620004d3565b925050606085015167ffffffffffffffff811115620006565762000655620002d0565b5b62000664878288016200058d565b91505092959194509250565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620006ac82620004af565b9150620006b983620004af565b9250828201905080821115620006d457620006d362000670565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006200071682620004af565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036200074b576200074a62000670565b5b600182019050919050565b60805160a05161261b6200079f60003960008181610a840152610bbc01526000818161048f0152818161087801528181610abd015281816111630152611231015261261b6000f3fe6080604052600436106101095760003560e01c80636e04ff0d11610095578063995e433911610064578063995e433914610399578063b94fe917146103c9578063bfaba76a14610407578063d74497c914610432578063f1813d511461044e57610109565b80636e04ff0d146102b65780638bc4a5a5146102f4578063904b9f721461033157806391ad27b41461036e57610109565b8063320229eb116100dc578063320229eb146101de5780634585e33b146102095780635af36e3e146102325780636997bae91461024e5780636b1426a41461027957610109565b806309bc33a71461010e57806311797369146101395780631ed7ccdc146101645780632102d5e4146101a1575b600080fd5b34801561011a57600080fd5b5061012361048b565b6040516101309190611675565b60405180910390f35b34801561014557600080fd5b5061014e6104b3565b60405161015b9190611675565b60405180910390f35b34801561017057600080fd5b5061018b6004803603810190610186919061194e565b6104bf565b6040516101989190611aee565b60405180910390f35b3480156101ad57600080fd5b506101c860048036038101906101c39190611b10565b610587565b6040516101d59190611aee565b60405180910390f35b3480156101ea57600080fd5b506101f3610774565b6040516102009190611675565b60405180910390f35b34801561021557600080fd5b50610230600480360381019061022b9190611c0e565b61077e565b005b61024c60048036038101906102479190611c57565b6107e7565b005b34801561025a57600080fd5b506102636109c7565b6040516102709190611675565b60405180910390f35b34801561028557600080fd5b506102a0600480360381019061029b9190611c97565b6109d1565b6040516102ad9190611d73565b60405180910390f35b3480156102c257600080fd5b506102dd60048036038101906102d89190611c0e565b610a7e565b6040516102eb929190611e2f565b60405180910390f35b34801561030057600080fd5b5061031b60048036038101906103169190611c97565b610ab9565b6040516103289190611675565b60405180910390f35b34801561033d57600080fd5b5061035860048036038101906103539190611c97565b610b10565b6040516103659190611e8e565b60405180910390f35b34801561037a57600080fd5b50610383610bb8565b6040516103909190611675565b60405180910390f35b6103b360048036038101906103ae9190611c97565b610be0565b6040516103c09190611aee565b60405180910390f35b3480156103d557600080fd5b506103f060048036038101906103eb9190611c97565b610f74565b6040516103fe929190611ed4565b60405180910390f35b34801561041357600080fd5b5061041c610fe5565b6040516104299190611fdb565b60405180910390f35b61044c60048036038101906104479190611ffd565b6110a4565b005b34801561045a57600080fd5b5061047560048036038101906104709190611c97565b611331565b6040516104829190611aee565b60405180910390f35b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60008080549050905090565b606060006104cc8361142d565b50905060005b845181101561057c5760008582815181106104f0576104ef61203d565b5b6020026020010151600001519050828112610538578281610511919061209b565b8683815181106105245761052361203d565b5b602002602001015160400181815250610567565b8083610544919061209b565b8683815181106105575761055661203d565b5b6020026020010151604001818152505b50508080610574906120de565b9150506104d2565b508391505092915050565b6060610591611527565b60005b835181101561076a5760005b60018286516105af9190612126565b6105b99190612126565b81101561075657846001826105ce919061215a565b815181106105df576105de61203d565b5b6020026020010151604001518582815181106105fe576105fd61203d565b5b60200260200101516040015111806106b057508460018261061f919061215a565b815181106106305761062f61203d565b5b60200260200101516040015185828151811061064f5761064e61203d565b5b6020026020010151604001511480156106af575084600182610671919061215a565b815181106106825761068161203d565b5b6020026020010151602001518582815181106106a1576106a061203d565b5b602002602001015160200151115b5b15610743578481815181106106c8576106c761203d565b5b60200260200101519250846001826106e0919061215a565b815181106106f1576106f061203d565b5b602002602001015185828151811061070c5761070b61203d565b5b60200260200101819052508285600183610726919061215a565b815181106107375761073661203d565b5b60200260200101819052505b808061074e906120de565b9150506105a0565b508080610762906120de565b915050610594565b5082915050919050565b6000600154905090565b600061079860405180602001604052806000815250610a7e565b50905080156107e3574260018190555060005b6000805490508110156107e1576107cd6001826107c8919061215a565b610be0565b5080806107d9906120de565b9150506107ab565b505b5050565b60005b818110156109355760058210156109225760006003600060018661080e9190612126565b8152602001908152602001600020828154811061082e5761082d61203d565b5b906000526020600020906005020160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f00000000000000000000000000000000000000000000000000000000000000006040516108a3906121bf565b60006040518083038185875af1925050503d80600081146108e0576040519150601f19603f3d011682016040523d82523d6000602084013e6108e5565b606091505b5050905080610920576040517f2282ee5400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505b808061092d906120de565b9150506107ea565b50600360006001846109479190612126565b81526020019081526020016000206000610961919061156c565b7f564c0a2f5ba521d3247c4a3487b8c208198a1a72af1f3819ac9f48ecc29f2323826040516109909190611675565b60405180910390a1600460006001846109a99190612126565b815260200190815260200160002060006109c39190611590565b5050565b6000600554905090565b6060600460006001846109e49190612126565b8152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610a7257602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610a28575b50505050509050919050565b600060607f000000000000000000000000000000000000000000000000000000000000000060015442610ab19190612126565b119150915091565b60007f000000000000000000000000000000000000000000000000000000000000000060036000600185610aed9190612126565b815260200190815260200160002080549050610b0991906121d4565b9050919050565b610b186115b1565b6000600183610b279190612126565b81548110610b3857610b3761203d565b5b9060005260206000209060020201604051806040016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050919050565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6060610c0e8260036000600186610bf79190612126565b8152602001908152602001600020805490506107e7565b6000610d65610d6060036000600187610c279190612126565b8152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610d0557838290600052602060002090600502016040518060a00160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160048201548152505081526020019060010190610c55565b505050506000600187610d189190612126565b81548110610d2957610d2861203d565b5b906000526020600020906002020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166104bf565b610587565b905060005b600b80549050811015610f085760046000600186610d889190612126565b8152602001908152602001600020828281518110610da957610da861203d565b5b6020026020010151606001519080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000828281518110610e2a57610e2961203d565b5b60200260200101516060015173ffffffffffffffffffffffffffffffffffffffff16600b8381548110610e6057610e5f61203d565b5b9060005260206000200154604051610e77906121bf565b60006040518083038185875af1925050503d8060008114610eb4576040519150601f19603f3d011682016040523d82523d6000602084013e610eb9565b606091505b5050905080610ef4576040517fc38289b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b508080610f00906120de565b915050610d6a565b5060036000600185610f1a9190612126565b81526020019081526020016000206000610f34919061156c565b7ffba192deaecbe7fa98bd977ab6a41d5e30515950160612a6341b3f3477568f6883604051610f639190611675565b60405180910390a180915050919050565b600080600080610fd46000600187610f8c9190612126565b81548110610f9d57610f9c61203d565b5b906000526020600020906002020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661142d565b915091508181935093505050915091565b60606000805480602002602001604051908101604052809291908181526020016000905b8282101561109b5783829060005260206000209060020201604051806040016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505081526020019060010190611009565b50505050905090565b600061110060006001856110b89190612126565b815481106110c9576110c861203d565b5b906000526020600020906002020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661142d565b915050600554600360006001866111179190612126565b8152602001908152602001600020805490501115611161576040517fe45c23e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000034146111ba576040517f39b4a2ec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600081600a6111c99190612349565b836111d49190612394565b9050600360006001866111e79190612126565b81526020019081526020016000206040518060a00160405280838152602001428152602001600081526020013373ffffffffffffffffffffffffffffffffffffffff1681526020017f0000000000000000000000000000000000000000000000000000000000000000815250908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506080820151816004015550507f726fd38827c0988466fe6ed9ceb1334ceefdf9d631bcec2807f2e44885ea4c6e83426000336040516113239493929190612460565b60405180910390a150505050565b6060600360006001846113449190612126565b8152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561142257838290600052602060002090600502016040518060a00160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160048201548152505081526020019060010190611372565b505050509050919050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa15801561147d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114a19190612511565b50505091505060008473ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114f4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061151891906125b8565b90508181935093505050915091565b6040518060a00160405280600081526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b508054600082556005029060005260206000209081019061158d91906115e1565b50565b50805460008255906000526020600020908101906115ae919061163f565b50565b604051806040016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b5b8082111561163b57600080820160009055600182016000905560028201600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004820160009055506005016115e2565b5090565b5b80821115611658576000816000905550600101611640565b5090565b6000819050919050565b61166f8161165c565b82525050565b600060208201905061168a6000830184611666565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6116f2826116a9565b810181811067ffffffffffffffff82111715611711576117106116ba565b5b80604052505050565b6000611724611690565b905061173082826116e9565b919050565b600067ffffffffffffffff8211156117505761174f6116ba565b5b602082029050602081019050919050565b600080fd5b600080fd5b6000819050919050565b61177e8161176b565b811461178957600080fd5b50565b60008135905061179b81611775565b92915050565b6117aa8161165c565b81146117b557600080fd5b50565b6000813590506117c7816117a1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006117f8826117cd565b9050919050565b611808816117ed565b811461181357600080fd5b50565b600081359050611825816117ff565b92915050565b600060a0828403121561184157611840611766565b5b61184b60a061171a565b9050600061185b8482850161178c565b600083015250602061186f848285016117b8565b6020830152506040611883848285016117b8565b604083015250606061189784828501611816565b60608301525060806118ab848285016117b8565b60808301525092915050565b60006118ca6118c584611735565b61171a565b90508083825260208201905060a084028301858111156118ed576118ec611761565b5b835b818110156119165780611902888261182b565b84526020840193505060a0810190506118ef565b5050509392505050565b600082601f830112611935576119346116a4565b5b81356119458482602086016118b7565b91505092915050565b600080604083850312156119655761196461169a565b5b600083013567ffffffffffffffff8111156119835761198261169f565b5b61198f85828601611920565b92505060206119a085828601611816565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6119df8161176b565b82525050565b6119ee8161165c565b82525050565b6119fd816117ed565b82525050565b60a082016000820151611a1960008501826119d6565b506020820151611a2c60208501826119e5565b506040820151611a3f60408501826119e5565b506060820151611a5260608501826119f4565b506080820151611a6560808501826119e5565b50505050565b6000611a778383611a03565b60a08301905092915050565b6000602082019050919050565b6000611a9b826119aa565b611aa581856119b5565b9350611ab0836119c6565b8060005b83811015611ae1578151611ac88882611a6b565b9750611ad383611a83565b925050600181019050611ab4565b5085935050505092915050565b60006020820190508181036000830152611b088184611a90565b905092915050565b600060208284031215611b2657611b2561169a565b5b600082013567ffffffffffffffff811115611b4457611b4361169f565b5b611b5084828501611920565b91505092915050565b600080fd5b600067ffffffffffffffff821115611b7957611b786116ba565b5b611b82826116a9565b9050602081019050919050565b82818337600083830152505050565b6000611bb1611bac84611b5e565b61171a565b905082815260208101848484011115611bcd57611bcc611b59565b5b611bd8848285611b8f565b509392505050565b600082601f830112611bf557611bf46116a4565b5b8135611c05848260208601611b9e565b91505092915050565b600060208284031215611c2457611c2361169a565b5b600082013567ffffffffffffffff811115611c4257611c4161169f565b5b611c4e84828501611be0565b91505092915050565b60008060408385031215611c6e57611c6d61169a565b5b6000611c7c858286016117b8565b9250506020611c8d858286016117b8565b9150509250929050565b600060208284031215611cad57611cac61169a565b5b6000611cbb848285016117b8565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000611cfc83836119f4565b60208301905092915050565b6000602082019050919050565b6000611d2082611cc4565b611d2a8185611ccf565b9350611d3583611ce0565b8060005b83811015611d66578151611d4d8882611cf0565b9750611d5883611d08565b925050600181019050611d39565b5085935050505092915050565b60006020820190508181036000830152611d8d8184611d15565b905092915050565b60008115159050919050565b611daa81611d95565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611dea578082015181840152602081019050611dcf565b60008484015250505050565b6000611e0182611db0565b611e0b8185611dbb565b9350611e1b818560208601611dcc565b611e24816116a9565b840191505092915050565b6000604082019050611e446000830185611da1565b8181036020830152611e568184611df6565b90509392505050565b604082016000820151611e7560008501826119e5565b506020820151611e8860208501826119f4565b50505050565b6000604082019050611ea36000830184611e5f565b92915050565b611eb28161176b565b82525050565b600060ff82169050919050565b611ece81611eb8565b82525050565b6000604082019050611ee96000830185611ea9565b611ef66020830184611ec5565b9392505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b604082016000820151611f3f60008501826119e5565b506020820151611f5260208501826119f4565b50505050565b6000611f648383611f29565b60408301905092915050565b6000602082019050919050565b6000611f8882611efd565b611f928185611f08565b9350611f9d83611f19565b8060005b83811015611fce578151611fb58882611f58565b9750611fc083611f70565b925050600181019050611fa1565b5085935050505092915050565b60006020820190508181036000830152611ff58184611f7d565b905092915050565b600080604083850312156120145761201361169a565b5b6000612022858286016117b8565b92505060206120338582860161178c565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006120a68261176b565b91506120b18361176b565b92508282039050818112600084121682821360008512151617156120d8576120d761206c565b5b92915050565b60006120e98261165c565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361211b5761211a61206c565b5b600182019050919050565b60006121318261165c565b915061213c8361165c565b92508282039050818111156121545761215361206c565b5b92915050565b60006121658261165c565b91506121708361165c565b92508282019050808211156121885761218761206c565b5b92915050565b600081905092915050565b50565b60006121a960008361218e565b91506121b482612199565b600082019050919050565b60006121ca8261219c565b9150819050919050565b60006121df8261165c565b91506121ea8361165c565b92508282026121f88161165c565b9150828204841483151761220f5761220e61206c565b5b5092915050565b60008160011c9050919050565b6000808291508390505b600185111561226d578086048111156122495761224861206c565b5b60018516156122585780820291505b808102905061226685612216565b945061222d565b94509492505050565b6000826122865760019050612342565b816122945760009050612342565b81600181146122aa57600281146122b4576122e3565b6001915050612342565b60ff8411156122c6576122c561206c565b5b8360020a9150848211156122dd576122dc61206c565b5b50612342565b5060208310610133831016604e8410600b84101617156123185782820a9050838111156123135761231261206c565b5b612342565b6123258484846001612223565b9250905081840481111561233c5761233b61206c565b5b81810290505b9392505050565b60006123548261165c565b915061235f83611eb8565b925061238c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484612276565b905092915050565b600061239f8261176b565b91506123aa8361176b565b92508282026123b88161176b565b91507f800000000000000000000000000000000000000000000000000000000000000084146000841216156123f0576123ef61206c565b5b82820584148315176124055761240461206c565b5b5092915050565b6000819050919050565b6000819050919050565b600061243b6124366124318461240c565b612416565b61165c565b9050919050565b61244b81612420565b82525050565b61245a816117ed565b82525050565b60006080820190506124756000830187611ea9565b6124826020830186611666565b61248f6040830185612442565b61249c6060830184612451565b95945050505050565b600069ffffffffffffffffffff82169050919050565b6124c4816124a5565b81146124cf57600080fd5b50565b6000815190506124e1816124bb565b92915050565b6000815190506124f681611775565b92915050565b60008151905061250b816117a1565b92915050565b600080600080600060a0868803121561252d5761252c61169a565b5b600061253b888289016124d2565b955050602061254c888289016124e7565b945050604061255d888289016124fc565b935050606061256e888289016124fc565b925050608061257f888289016124d2565b9150509295509295909350565b61259581611eb8565b81146125a057600080fd5b50565b6000815190506125b28161258c565b92915050565b6000602082840312156125ce576125cd61169a565b5b60006125dc848285016125a3565b9150509291505056fea264697066735822122067887a08696b5ca568269677dd777dd9431a25be395ed9a9848fad3f8ca236b264736f6c63430008110033";

type PredictionContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PredictionContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PredictionContract__factory extends ContractFactory {
  constructor(...args: PredictionContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    addresses: PromiseOrValue<string>[],
    entranceFee: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    rewards: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PredictionContract> {
    return super.deploy(
      addresses,
      entranceFee,
      interval,
      rewards,
      overrides || {}
    ) as Promise<PredictionContract>;
  }
  override getDeployTransaction(
    addresses: PromiseOrValue<string>[],
    entranceFee: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    rewards: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      addresses,
      entranceFee,
      interval,
      rewards,
      overrides || {}
    );
  }
  override attach(address: string): PredictionContract {
    return super.attach(address) as PredictionContract;
  }
  override connect(signer: Signer): PredictionContract__factory {
    return super.connect(signer) as PredictionContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PredictionContractInterface {
    return new utils.Interface(_abi) as PredictionContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PredictionContract {
    return new Contract(address, _abi, signerOrProvider) as PredictionContract;
  }
}
