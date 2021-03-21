"use strict";

function createErrorMessage(message, status, request, response) {
  const error = new Error(message);

  return {
    statusCode: status,
    message: error,
    request: request,
    response: response,
  };
}

function parseHeader(header) {
  let headerFilter = header.replace(/(?:\r\n|\r|\n)/g, ", ");
  console.log(JSON.parse(JSON.stringify({ headerFilter })));
}

/**
 *
 * @param {*} config
 * @returns Promise
 */
function requestP(config) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.open(config.method, config.url, true);

    request.responseType = config.responseType;

    request.onreadystatechange = function () {
      const responseData =
        !config.responseType || config.responseType === "text"
          ? request.responseText
          : request.response;

      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: parseHeader(request.getAllResponseHeaders()),
      };

      if (request.readyState === XMLHttpRequest.DONE && response.status !== 0) {
        if (request.status === 200) {
          resolve(response);
        } else {
          reject(
            createErrorMessage(
              "Request failed with status code " + response.status,
              response.status,
              config,
              response
            )
          );
        }
      }
    };

    request.onerror = function () {
      throw new Error("Request failed");
    };

    request.send();
  });
}

requestP({
  method: "GET",
  url: "https://jsonplaceholder.typicode.com/comments?postId=1",
  responseType: "json",
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// async function getPosts() {
//   const res = await requestP({
//     method: "GET",
//     url: "https://jsonplaceholder.typicode.com/comments?postId=1",
//     responseType: "json",
//   });

//   console.log(res.data);
// }
// getPosts();

// function validateAndMerge(...sources) {
//   for (const source of sources) {
//     if (
//       (!isObject(source) || Array.isArray(source)) &&
//       typeof source !== "undefined"
//     ) {
//       throw new TypeError("The `options` argument must be an object");
//     }
//   }

//     return deepMerge({}, ...sources);
// }

// function createInstance(defaults) {
//   const palve = (input, options) =>
//     new palve(input, validateAndMerge(defaults, options));

//   for (const method of REQUEST_METHODS) {
//     palve[method] = (input, options) =>
//       new palve(input, validateAndMerge(defaults, options, { method }));
//   }

//   return palve;
// }
