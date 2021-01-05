exports.main = (context, sendResponse) => {
    // https://developers.hubspot.com/docs/cms/features/serverless-functions
    // https://developers.hubspot.com/docs/cms/features/serverless-functions/event-registration-app

    // your code called when the function is executed
    const functionResponse = "Congrats! You've just deployed a Serverless Function."
  
    // sendResponse is a callback function you call to send your response.
    sendResponse({body: functionResponse, statusCode: 200});
 };