const axios = require('axios');

const jsonData = 
[{"username":"ktourle1j","email":"ccarrigan1j@vkontakte.ru","passphrase":"9999999"},
{"username":"nmankor1k","email":"asaturley1k@squidoo.com","passphrase":"9999999"},
{"username":"anorway1l","email":"bscotsbrook1l@spotify.com","passphrase":"9999999"},
{"username":"gcorro1m","email":"vstiger1m@is.gd","passphrase":"9999999"},
{"username":"vthompstone1n","email":"ldunmore1n@chron.com","passphrase":"9999999"},
{"username":"rrousell1o","email":"gpinyon1o@independent.co.uk","passphrase":"9999999"},
{"username":"cproffitt1p","email":"cbullingham1p@taobao.com","passphrase":"9999999"},
{"username":"kgreville1q","email":"frhule1q@google.co.jp","passphrase":"9999999"},
{"username":"cbumphries1r","email":"dtipple1r@seattletimes.com","passphrase":"9999999"},
{"username":"dnutter1s","email":"mfolini1s@wiley.com","passphrase":"9999999"},
{"username":"hladen1t","email":"jclemence1t@disqus.com","passphrase":"9999999"},
{"username":"snavarre1u","email":"ivigietti1u@nps.gov","passphrase":"9999999"},
{"username":"mbarringer1v","email":"lmcwhorter1v@stanford.edu","passphrase":"9999999"},
{"username":"jortells1w","email":"rclew1w@sina.com.cn","passphrase":"9999999"},
{"username":"pdrayton1x","email":"dhickinbottom1x@baidu.com","passphrase":"9999999"},
{"username":"rpatzelt1y","email":"vbyass1y@wired.com","passphrase":"9999999"},
{"username":"aorring1z","email":"rclac1z@walmart.com","passphrase":"9999999"},
{"username":"wandriss20","email":"odispencer20@hexun.com","passphrase":"9999999"},
{"username":"jbrundell21","email":"mmathie21@who.int","passphrase":"9999999"},
{"username":"rwhewell22","email":"pbranno22@hao123.com","passphrase":"9999999"},
{"username":"elomansey23","email":"agowdy23@homestead.com","passphrase":"9999999"},
{"username":"wpease24","email":"vhoworth24@tripadvisor.com","passphrase":"9999999"},
{"username":"ayankeev25","email":"eliver25@mapquest.com","passphrase":"9999999"},
{"username":"gsaladine26","email":"mbrownett26@prnewswire.com","passphrase":"9999999"},
{"username":"jwoffenden27","email":"valekhov27@senate.gov","passphrase":"9999999"},
{"username":"rfrantzeni28","email":"madvani28@fema.gov","passphrase":"9999999"},
{"username":"awadmore29","email":"arichemont29@nsw.gov.au","passphrase":"9999999"},
{"username":"cgive2a","email":"ttrimnell2a@hud.gov","passphrase":"9999999"},
{"username":"lsarver2b","email":"llob2b@va.gov","passphrase":"9999999"},
{"username":"hmackness2c","email":"fcake2c@webnode.com","passphrase":"9999999"},
{"username":"aclipson2d","email":"xnassau2d@weather.com","passphrase":"9999999"},
{"username":"gedworthie2e","email":"pzealy2e@plala.or.jp","passphrase":"9999999"},
{"username":"ftotterdill2f","email":"cculross2f@fotki.com","passphrase":"9999999"},
{"username":"rdawidowitsch2g","email":"ebrunger2g@bloomberg.com","passphrase":"9999999"},
{"username":"mludy2h","email":"rtinston2h@walmart.com","passphrase":"9999999"},
{"username":"wwetherburn2i","email":"ffranklin2i@ed.gov","passphrase":"9999999"},
{"username":"cskelington2j","email":"gbattie2j@skype.com","passphrase":"9999999"},
{"username":"edron2k","email":"sheisman2k@ezinearticles.com","passphrase":"9999999"},
{"username":"fedbrooke2l","email":"mmckellen2l@webmd.com","passphrase":"9999999"},
{"username":"smandy2m","email":"smcgivena2m@t-online.de","passphrase":"9999999"},
{"username":"alutsch2n","email":"ksirman2n@printfriendly.com","passphrase":"9999999"},
{"username":"sabele2o","email":"lbalcon2o@tripadvisor.com","passphrase":"9999999"},
{"username":"bhebbard2p","email":"bloody2p@google.co.uk","passphrase":"9999999"},]



// The function that sends the POST request to the server
async function createPost(user) {
  try {
    const response = await axios.post('http://localhost:9000/database-queries/create_new_user', {
      username: user.username,
      email: user.email,
      passphrase: user.passphrase,
    });
    return response.data;
  } catch (error) {
    console.log("err");
    // throw new Error(error.message);
  }
}

// Function to introduce a delay using setTimeout
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Asynchronous function to process the data
async function processJsonData() {
  for (const user of jsonData) {
    // Make the POST request for each user
    await createPost(user);

    // Introduce a delay of 1 second (1000 milliseconds) between requests
    // await delay(100);
  }
}

// Call the function to start processing the data
processJsonData()
  .then(() => {
    console.log('All POST requests completed.');
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
