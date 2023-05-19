const MoodContractAddress = "0xa052021C7Bca1E5411B4Cd404bb2b203A6544337";
const MoodContractABI = `
  [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  `
let MoodContract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(MoodContractAddress, MoodContractABI, signer);
    }
    )
})

async function getMood() {
    const getMoodPromise = MoodContract.getMood();
    const Mood = await getMoodPromise;
    document.getElementById("showMood").innerText = `Your Mood: ${Mood}`;
    console.log(Mood);
}

async function setMood() {
    const mood = document.getElementById("mood").value;
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
}

document.querySelector(".get-mood").addEventListener("click", getMood);
document.querySelector(".set-mood").addEventListener("click", setMood);