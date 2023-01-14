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
    name: "Prediction__TopUp_error",
    type: "error",
  },
  {
    inputs: [],
    name: "Withdraw__Failed",
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
      {
        indexed: false,
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "NewPrediction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "ResultAnnounced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "TopUpSuccessfull",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "WithdrawSuccessfull",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]",
      },
    ],
    name: "Refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "addFunds",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
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
    name: "declareCompletetion",
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
    inputs: [
      {
        internalType: "uint256",
        name: "contestId",
        type: "uint256",
      },
    ],
    name: "getContestPlayers",
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
    inputs: [],
    name: "getOwner",
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
    inputs: [],
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "rewards",
        type: "uint256[]",
      },
    ],
    name: "setReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60e06040526101f46006553480156200001757600080fd5b506040516200277a3803806200277a83398181016040528101906200003d9190620004b3565b426001819055508160a08181525050826002908051906020019062000064929190620001dc565b508060c081815250503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050620000b1620000ba60201b60201c565b50505062000614565b60005b600280549050811015620001d95760006040518060400160405280600184620000e791906200055d565b81526020016002848154811062000103576200010262000598565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050508080620001d090620005c7565b915050620000bd565b50565b82805482825590600052602060002090810192821562000258579160200282015b82811115620002575782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190620001fd565b5b5090506200026791906200026b565b5090565b5b80821115620002865760008160009055506001016200026c565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002ee82620002a3565b810181811067ffffffffffffffff8211171562000310576200030f620002b4565b5b80604052505050565b6000620003256200028a565b9050620003338282620002e3565b919050565b600067ffffffffffffffff821115620003565762000355620002b4565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000399826200036c565b9050919050565b620003ab816200038c565b8114620003b757600080fd5b50565b600081519050620003cb81620003a0565b92915050565b6000620003e8620003e28462000338565b62000319565b905080838252602082019050602084028301858111156200040e576200040d62000367565b5b835b818110156200043b5780620004268882620003ba565b84526020840193505060208101905062000410565b5050509392505050565b600082601f8301126200045d576200045c6200029e565b5b81516200046f848260208601620003d1565b91505092915050565b6000819050919050565b6200048d8162000478565b81146200049957600080fd5b50565b600081519050620004ad8162000482565b92915050565b600080600060608486031215620004cf57620004ce62000294565b5b600084015167ffffffffffffffff811115620004f057620004ef62000299565b5b620004fe8682870162000445565b935050602062000511868287016200049c565b925050604062000524868287016200049c565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200056a8262000478565b9150620005778362000478565b92508282019050808211156200059257620005916200052e565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000620005d48262000478565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036200060957620006086200052e565b5b600182019050919050565b60805160a05160c0516120fe6200067c600039600081816107540152818161087a0152610a7b0152600081816105360152818161057001528181610aa101528181610d4801528181610e9f01528181610f91015261104f015260006109ab01526120fe6000f3fe6080604052600436106101355760003560e01c8063893d20e8116100ab578063bc01d98d1161006f578063bc01d98d14610412578063bfaba76a1461043b578063c018e69814610466578063d27e80b51461048f578063d74497c9146104cc578063f1813d51146104f557610135565b8063893d20e814610337578063904b9f721461036257806391ad27b41461039f578063a26759cb146103ca578063b94fe917146103d457610135565b80634585e33b116100fd5780634585e33b146102025780636997bae91461022b5780636b1426a4146102565780636e04ff0d1461029357806370a08231146102d157806385eddeea1461030e57610135565b806309bc33a71461013a578063117973691461016557806312b58349146101905780632e1a7d4d146101bb578063320229eb146101d7575b600080fd5b34801561014657600080fd5b5061014f610532565b60405161015c9190611346565b60405180910390f35b34801561017157600080fd5b5061017a61055a565b6040516101879190611346565b60405180910390f35b34801561019c57600080fd5b506101a5610566565b6040516101b29190611346565b60405180910390f35b6101d560048036038101906101d091906113a1565b61056e565b005b3480156101e357600080fd5b506101ec610748565b6040516101f99190611346565b60405180910390f35b34801561020e57600080fd5b5061022960048036038101906102249190611514565b610752565b005b34801561023757600080fd5b506102406107bd565b60405161024d9190611346565b60405180910390f35b34801561026257600080fd5b5061027d600480360381019061027891906113a1565b6107c7565b60405161028a919061164d565b60405180910390f35b34801561029f57600080fd5b506102ba60048036038101906102b59190611514565b610874565b6040516102c8929190611709565b60405180910390f35b3480156102dd57600080fd5b506102f860048036038101906102f39190611765565b6108b0565b6040516103059190611346565b60405180910390f35b34801561031a57600080fd5b506103356004803603810190610330919061191d565b6108f9565b005b34801561034357600080fd5b5061034c6109a7565b60405161035991906119a4565b60405180910390f35b34801561036e57600080fd5b50610389600480360381019061038491906113a1565b6109cf565b60405161039691906119fd565b60405180910390f35b3480156103ab57600080fd5b506103b4610a77565b6040516103c19190611346565b60405180910390f35b6103d2610a9f565b005b3480156103e057600080fd5b506103fb60048036038101906103f691906113a1565b610b8a565b604051610409929190611a4d565b60405180910390f35b34801561041e57600080fd5b50610439600480360381019061043491906113a1565b610bfb565b005b34801561044757600080fd5b50610450610c7b565b60405161045d9190611b54565b60405180910390f35b34801561047257600080fd5b5061048d60048036038101906104889190611b76565b610d3a565b005b34801561049b57600080fd5b506104b660048036038101906104b191906113a1565b610ded565b6040516104c39190611346565b60405180910390f35b3480156104d857600080fd5b506104f360048036038101906104ee9190611beb565b610e16565b005b34801561050157600080fd5b5061051c600480360381019061051791906113a1565b611107565b6040516105299190611d51565b60405180910390f35b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60008080549050905090565b600047905090565b7f0000000000000000000000000000000000000000000000000000000000000000811080156105db5750600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481115b15610612576040517f3fb6985b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60003373ffffffffffffffffffffffffffffffffffffffff168260405161063890611da4565b60006040518083038185875af1925050503d8060008114610675576040519150601f19603f3d011682016040523d82523d6000602084013e61067a565b606091505b50509050806106b5576040517f3fb6985b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107049190611de8565b925050819055507f79d6154499fe61db70df5e974d6947219675596a035f25c56e2dc7575d04187a823360405161073c929190611e1c565b60405180910390a15050565b6000600154905090565b7f0000000000000000000000000000000000000000000000000000000000000000600154426107819190611de8565b106107ba57426001819055507f4341dddeeae96cb085a30b68a8c3e38b00f5b7c5ff4fa9f31079e5b41a9c69ad60405160405180910390a15b50565b6000600654905090565b6060600460006001846107da9190611de8565b815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561086857602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161081e575b50505050509050919050565b600060607f0000000000000000000000000000000000000000000000000000000000000000600154426108a79190611de8565b10159150915091565b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60005b82518110156109a25781818151811061091857610917611e45565b5b60200260200101516005600085848151811061093757610936611e45565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109889190611e74565b92505081905550808061099a90611ea8565b9150506108fc565b505050565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6109d76112fd565b60006001836109e69190611de8565b815481106109f7576109f6611e45565b5b9060005260206000209060020201604051806040016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050919050565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b7f0000000000000000000000000000000000000000000000000000000000000000341015610af9576040517f818f734e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b34600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b489190611e74565b925050819055507f30235040a226b2e9a074ef96d790e10e9ce5f2be30aaf8049fda6a5e03f144273433604051610b80929190611e1c565b60405180910390a1565b600080600080610bea6000600187610ba29190611de8565b81548110610bb357610bb2611e45565b5b906000526020600020906002020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611203565b915091508181935093505050915091565b60036000600183610c0c9190611de8565b81526020019081526020016000208054905060076000600184610c2f9190611de8565b8152602001908152602001600020819055507ffba192deaecbe7fa98bd977ab6a41d5e30515950160612a6341b3f3477568f6881604051610c709190611346565b60405180910390a150565b60606000805480602002602001604051908101604052809291908181526020016000905b82821015610d315783829060005260206000209060020201604051806040016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505081526020019060010190610c9f565b50505050905090565b60005b8151811015610de9577f000000000000000000000000000000000000000000000000000000000000000060056000848481518110610d7e57610d7d611e45565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610dcf9190611e74565b925050819055508080610de190611ea8565b915050610d3d565b5050565b600060076000600184610e009190611de8565b8152602001908152602001600020549050919050565b60076000600184610e279190611de8565b815260200190815260200160002054600654610e439190611e74565b60036000600185610e549190611de8565b81526020019081526020016000208054905010610e9d576040517fe45c23e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f0000000000000000000000000000000000000000000000000000000000000000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610f36576040517f39b4a2ec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60036000600184610f479190611de8565b81526020019081526020016000206040518060a00160405280838152602001428152602001600081526020013373ffffffffffffffffffffffffffffffffffffffff1681526020017f0000000000000000000000000000000000000000000000000000000000000000815250908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506080820151816004015550507f0000000000000000000000000000000000000000000000000000000000000000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546110bc9190611de8565b925050819055507f3a63f877abc26c9d8968076e2171dea3f3e5da8cb52d749794ebe85aeb3c98928142600033866040516110fb959493929190611f35565b60405180910390a15050565b60606003600060018461111a9190611de8565b8152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b828210156111f857838290600052602060002090600502016040518060a00160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160048201548152505081526020019060010190611148565b505050509050919050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa158015611253573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112779190611ff4565b50505091505060008473ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156112ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ee919061209b565b90508181935093505050915091565b604051806040016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6000819050919050565b6113408161132d565b82525050565b600060208201905061135b6000830184611337565b92915050565b6000604051905090565b600080fd5b600080fd5b61137e8161132d565b811461138957600080fd5b50565b60008135905061139b81611375565b92915050565b6000602082840312156113b7576113b661136b565b5b60006113c58482850161138c565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611421826113d8565b810181811067ffffffffffffffff821117156114405761143f6113e9565b5b80604052505050565b6000611453611361565b905061145f8282611418565b919050565b600067ffffffffffffffff82111561147f5761147e6113e9565b5b611488826113d8565b9050602081019050919050565b82818337600083830152505050565b60006114b76114b284611464565b611449565b9050828152602081018484840111156114d3576114d26113d3565b5b6114de848285611495565b509392505050565b600082601f8301126114fb576114fa6113ce565b5b813561150b8482602086016114a4565b91505092915050565b60006020828403121561152a5761152961136b565b5b600082013567ffffffffffffffff81111561154857611547611370565b5b611554848285016114e6565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006115b482611589565b9050919050565b6115c4816115a9565b82525050565b60006115d683836115bb565b60208301905092915050565b6000602082019050919050565b60006115fa8261155d565b6116048185611568565b935061160f83611579565b8060005b8381101561164057815161162788826115ca565b9750611632836115e2565b925050600181019050611613565b5085935050505092915050565b6000602082019050818103600083015261166781846115ef565b905092915050565b60008115159050919050565b6116848161166f565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156116c45780820151818401526020810190506116a9565b60008484015250505050565b60006116db8261168a565b6116e58185611695565b93506116f58185602086016116a6565b6116fe816113d8565b840191505092915050565b600060408201905061171e600083018561167b565b818103602083015261173081846116d0565b90509392505050565b611742816115a9565b811461174d57600080fd5b50565b60008135905061175f81611739565b92915050565b60006020828403121561177b5761177a61136b565b5b600061178984828501611750565b91505092915050565b600067ffffffffffffffff8211156117ad576117ac6113e9565b5b602082029050602081019050919050565b600080fd5b60006117d66117d184611792565b611449565b905080838252602082019050602084028301858111156117f9576117f86117be565b5b835b81811015611822578061180e8882611750565b8452602084019350506020810190506117fb565b5050509392505050565b600082601f830112611841576118406113ce565b5b81356118518482602086016117c3565b91505092915050565b600067ffffffffffffffff821115611875576118746113e9565b5b602082029050602081019050919050565b60006118996118948461185a565b611449565b905080838252602082019050602084028301858111156118bc576118bb6117be565b5b835b818110156118e557806118d1888261138c565b8452602084019350506020810190506118be565b5050509392505050565b600082601f830112611904576119036113ce565b5b8135611914848260208601611886565b91505092915050565b600080604083850312156119345761193361136b565b5b600083013567ffffffffffffffff81111561195257611951611370565b5b61195e8582860161182c565b925050602083013567ffffffffffffffff81111561197f5761197e611370565b5b61198b858286016118ef565b9150509250929050565b61199e816115a9565b82525050565b60006020820190506119b96000830184611995565b92915050565b6119c88161132d565b82525050565b6040820160008201516119e460008501826119bf565b5060208201516119f760208501826115bb565b50505050565b6000604082019050611a1260008301846119ce565b92915050565b6000819050919050565b611a2b81611a18565b82525050565b600060ff82169050919050565b611a4781611a31565b82525050565b6000604082019050611a626000830185611a22565b611a6f6020830184611a3e565b9392505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b604082016000820151611ab860008501826119bf565b506020820151611acb60208501826115bb565b50505050565b6000611add8383611aa2565b60408301905092915050565b6000602082019050919050565b6000611b0182611a76565b611b0b8185611a81565b9350611b1683611a92565b8060005b83811015611b47578151611b2e8882611ad1565b9750611b3983611ae9565b925050600181019050611b1a565b5085935050505092915050565b60006020820190508181036000830152611b6e8184611af6565b905092915050565b600060208284031215611b8c57611b8b61136b565b5b600082013567ffffffffffffffff811115611baa57611ba9611370565b5b611bb68482850161182c565b91505092915050565b611bc881611a18565b8114611bd357600080fd5b50565b600081359050611be581611bbf565b92915050565b60008060408385031215611c0257611c0161136b565b5b6000611c108582860161138c565b9250506020611c2185828601611bd6565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611c6081611a18565b82525050565b60a082016000820151611c7c6000850182611c57565b506020820151611c8f60208501826119bf565b506040820151611ca260408501826119bf565b506060820151611cb560608501826115bb565b506080820151611cc860808501826119bf565b50505050565b6000611cda8383611c66565b60a08301905092915050565b6000602082019050919050565b6000611cfe82611c2b565b611d088185611c36565b9350611d1383611c47565b8060005b83811015611d44578151611d2b8882611cce565b9750611d3683611ce6565b925050600181019050611d17565b5085935050505092915050565b60006020820190508181036000830152611d6b8184611cf3565b905092915050565b600081905092915050565b50565b6000611d8e600083611d73565b9150611d9982611d7e565b600082019050919050565b6000611daf82611d81565b9150819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611df38261132d565b9150611dfe8361132d565b9250828203905081811115611e1657611e15611db9565b5b92915050565b6000604082019050611e316000830185611337565b611e3e6020830184611995565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000611e7f8261132d565b9150611e8a8361132d565b9250828201905080821115611ea257611ea1611db9565b5b92915050565b6000611eb38261132d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611ee557611ee4611db9565b5b600182019050919050565b6000819050919050565b6000819050919050565b6000611f1f611f1a611f1584611ef0565b611efa565b61132d565b9050919050565b611f2f81611f04565b82525050565b600060a082019050611f4a6000830188611a22565b611f576020830187611337565b611f646040830186611f26565b611f716060830185611995565b611f7e6080830184611337565b9695505050505050565b600069ffffffffffffffffffff82169050919050565b611fa781611f88565b8114611fb257600080fd5b50565b600081519050611fc481611f9e565b92915050565b600081519050611fd981611bbf565b92915050565b600081519050611fee81611375565b92915050565b600080600080600060a086880312156120105761200f61136b565b5b600061201e88828901611fb5565b955050602061202f88828901611fca565b945050604061204088828901611fdf565b935050606061205188828901611fdf565b925050608061206288828901611fb5565b9150509295509295909350565b61207881611a31565b811461208357600080fd5b50565b6000815190506120958161206f565b92915050565b6000602082840312156120b1576120b061136b565b5b60006120bf84828501612086565b9150509291505056fea2646970667358221220cf2b401a2a85e0b6930f97dbe6e9ad4d443f733783beef34eaed9b4ef4dc31c464736f6c63430008110033";

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
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PredictionContract> {
    return super.deploy(
      addresses,
      entranceFee,
      interval,
      overrides || {}
    ) as Promise<PredictionContract>;
  }
  override getDeployTransaction(
    addresses: PromiseOrValue<string>[],
    entranceFee: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      addresses,
      entranceFee,
      interval,
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
