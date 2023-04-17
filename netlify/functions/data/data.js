const fetch = require("node-fetch");
exports.handler = async function () {
  try {
    const response = await fetch(
      "https://cloud.solar-manager.ch/v1/stream/gateway/0000000090480A4F",
      {
        headers: { Accept: 'application/json',  'Authorization': `Basic ${process.env.AUTH}` },
        
      }
    );
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        frames: [{ icon: "50",text: data.currentPvGeneration.toString() },
        { icon: "44432",text: data.currentPowerConsumption.toString() }
      ],
      }),
    };
  } catch (error) {
    console.log(error); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
