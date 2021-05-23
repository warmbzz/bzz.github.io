import 'bootstrap';


export const CONTRACT_ADDRESS="THnSDgi6Do7Kvqhys7PndZvPVGzGRN4Y7c";

export const DEFAULT_REFERRER_ADDRESS="TUfkAQ1MaCcKUUudz3BfoGyudXyFoSHGL9";



document.getElementById('referral').value=DEFAULT_REFERRER_ADDRESS;


document.getElementById('btnInvest1').addEventListener("click", function () {
    deposit(1)
});

document.getElementById('btnInvest2').addEventListener("click", function () {
    invest(2)
});
document.getElementById('btnInvest3').addEventListener("click", function () {
    invest(3)
});
document.getElementById('btnWithdraw').addEventListener("click", function () {
    withdraw()

});

//复制链接
var aEle = document.querySelector('#copy');
    aEle.addEventListener('click',function(){
        var copyDOM = document.querySelector('#selector');  
  var range = document.createRange();  
  range.selectNode(copyDOM);
  window.getSelection().addRange(range);
var successful = document.execCommand('copy');  
  try {  
    // Now that we've selected the anchor text, execute the copy command  
    
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy email command was ' + msg);  
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported  
  window.getSelection().removeAllRanges();  
    },false);
    
//复制链接


async function deposit(plan) {
    console.log('OK');
    let contract=await getContract();

    if(contract){

        let referral = document.getElementById('referral').value;

        let value=document.getElementById('investValue' + plan).value;

        contract.deposit(DEFAULT_REFERRER_ADDRESS).send({
            feeLimit: 20000000,
            callValue: value * 1000000,
            shouldPollResponse: true
        });
    }



}




async function withdraw() {
    let contract=await getContract();
    if(contract){
        contract.withdraw().send({
            feeLimit: 100_000_000,
            shouldPollResponse: true
        });
    }

}



function walletInstalled(){
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        return true;
    } else {
        return false;
    }
}



async function getContract(){
    if(walletInstalled()){
        return window.tronWeb.contract().at(CONTRACT_ADDRESS);
    }
}


// async function readInfo(){
//     let contract=await getContract();
//
//     if(contract){
//         contract.totalInvested().call().then(function(data){
//             let totalInvested=window.tronWeb.toDecimal(data["_hex"]);
//             document.getElementById('totalInvested').innerHTML=totalInvested / 1000000;
//         })
//         contract.totalRefRewards().call().then(function(data){
//             let totalRefRewards=window.tronWeb.toDecimal(data["_hex"]);
//             document.getElementById('totalRefRewards').innerHTML=totalRefRewards / 1000000;
//         })
//
//         contract.investors(window.tronWeb.defaultAddress.base58).call().then(function(data){
//             document.getElementById('invested').innerHTML=window.tronWeb.toDecimal(data['invested']["_hex"]) / 1000000;
//             document.getElementById('refRewards').innerHTML=window.tronWeb.toDecimal(data['totalRef']["_hex"]) / 1000000;
//         })
//
//         contract.withdrawable(window.tronWeb.defaultAddress.base58).call().then(function(data){
//             document.getElementById('withdrawable').innerHTML=window.tronWeb.toDecimal(data['amount']["_hex"]) / 1000000;
//         })
//     }
//
// }

async function readEvents(){
    let contract=await getContract();

    if(contract){
        tronWeb.getEventResult(CONTRACT_ADDRESS, {size:10})
        .then(function(data){
            let res='';
            let index=1;
            data.forEach(function(event){
                res= res + " <tr>";
                res= res + " <td>" + index + "</td>";
                res= res + " <td>" + event['timestamp'] + "</td>";
                res= res + " <td>" + event['result']['user'] + "</td>";
                res= res + " <td>" + event['result']['value']/1000000 + " TRX</td>";
                res= res + " </tr>";
                index++;
            })
            document.getElementById('tblEvents').innerHTML=res;
        })
        .catch(function(error){
            console.log(error);
        });
    }
}






// setInterval(function(){

//     readInfo();
//     readEvents();

// },2000);




setTimeout(function(){

    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                let oweraddress = window.tronWeb.defaultAddress.base58;
                        var resUrl = window.location.href;
                let index = resUrl.indexOf('=')+1;
                resUrl = resUrl.substring(0,index)
                var url = resUrl+oweraddress;
                if(index == 0)
                {
                    url = window.location.href+'?ref='+oweraddress;
                }
        document.querySelector('#selector').innerHTML =  url;
        //console.log(window.tronWeb.defaultAddress.base58)
    } else {
        alert('钱包链接出错，请用波场钱包')
    }
},2000);
